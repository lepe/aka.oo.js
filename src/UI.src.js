/* Initialize main class */
var Class = chic.Class;
/* UI class */
var UI = Class.extend({
    elem : null,
    baseurl  : "",
    widgets : [],
    //Initialize the Widget with initparam (used to recycle widget)
    init: function() {},
    //------------ PRIVATE --------------
    //Retrieve data from server
    _query : function(widget, callback) {
        widget.params.req = widget.request || widget.template;
        $.getJSON(this.baseurl, widget.params).done(function(data) {
            callback(widget, data);
        });
    },
    _getTemplate : function(widget, callback) {
        $.get("/htm/"+widget.template+".htm").done(function(res){
            widget.html = res;
            callback(widget);
        });
    },
    //Apply data and directives into the template and insert it 
    _transform : function(widget, set, callback) {
        var $html = $(widget.html);
		//Create unique ID:
        var elems = $("[id^='"+widget.prefix+"']").length;
		widget.widget_id = widget.prefix+(elems);
		$html.attr("id",widget.widget_id);
        //When there is no child in template (single element), we
        //insert the element into the selector and then apply render 
        if($html.children().length === 0) {
            $(widget.parent)[widget.action]($html);
			if(set !== null) $(widget.parent).render(set.models, set.directives);
        } else {
			if(set !== null) $html.render(set.models, set.directives);
            $(widget.parent)[widget.action]($html);
        }
        if(callback !== undefined) callback($html);
    },
    //------------ PUBLIC ---------------
    addWidget: function(action, widget, elem) {
        widget.parent = elem;
        widget.action = action;
        this.widgets.push(widget);
        return elem;
    },
    doWidgets: function($parent) {
        var ui = this;
        for(var w in this.widgets) {
            var widget = ui.widgets[w];
			if($parent === undefined || $parent.is(widget.parent) || $parent.find(widget.parent).length) {
				//TODO: place "loading" in parent
				ui._getTemplate(widget, function(widget) {
					widget.setup();
					widget.update = function() {
						ui._query(widget, function(widget, data) {
							widget.render(data,function(set, callback) {
								ui._transform(widget, set, callback);
							});
						});
					};
					widget.update();
				});
			}
        }
    }
});