/* Initialize main class */
var Class = chic.Class;
/* UI class */
var UI = Class.extend({
    elem	  : null,
    server    : "",
	templates : "",
    widgets   : [],
    //Initialize the Widget with initparam (used to recycle widget)
    init: function() {},
    //------------ PRIVATE --------------
    //Retrieve data from server
    _query : function(widget, callback) {
        widget.params[widget.parameter || "req"] = widget.request || widget.template;
        $.getJSON(widget.server || this.server, widget.params).done(function(data) {
            callback(widget, data);
        });
    },
    _getTemplate : function(widget, callback) {
        $.get(this.templates+"/"+widget.template+".htm").done(function(res){
            widget.html = res;
            callback(widget);
        });
    },
    //Apply data and directives into the template and insert it 
    _transform : function(widget, data) {
        var $html = $(widget.html);
		//Create unique ID:
        var elems = $("[id^='"+widget.prefix+"']").length;
		widget.widget_id = widget.prefix+(elems);
		$html.attr("id",widget.widget_id);
        //When there is no child in template (single element), we
        //insert the element into the selector and then apply render
		var directives = widget.directives(data);
        if($html.children().length === 0) {
            $(widget.parent)[widget.action]($html);
			if(widget.data !== null) $(widget.parent).render(data, directives);
        } else {
			if(widget.data !== null) $html.render(data, directives);
            $(widget.parent)[widget.action]($html);
        }
        if(widget.ready !== undefined) widget.ready($html);
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
					widget.update = function() {
						widget.setup();
						ui._query(widget, function(widget, data) {
							ui._transform(widget, data);
						});
					};
					widget.update();
				});
			}
        }
    }
});
