var Widget = Class.extend({
	initargs  : "",
	template  : "", //name of the template. It will look for: UI.templates + (this value) + ".htm"
	parameter : "req", //parameter value (Default: req)
	request   : "", //request value
	server	  : "", //Custom URL to use as "server" for this widget
	params	  : {}, //You can add extra parameters to send, like order, page, etc.
	prefix	  : "widget_", //used to generate IDs
	//private---
	parent : null, //jQuery parent
	action : null, //jQuery action: append, prepend or html
	html   : null, //translated html
	widget_id : "", //keep widget id to locate it (filled by UI)
	//Initialize the Widget with initparam (used to recycle widget)
	init: function() {
		this.initargs = arguments;
	},
	//Override it if need to modify params before sending to server. 
	setup  : function() {
		//this.params
	},
	//Override to describe the directives. You may change the data object here.
	directives : function(data) {
		//modify data here
		return {}; //return Transparency directives
	},
	//Override to modify the html after widget is ready
	ready	: function($html) {
		//modify $html
	},
	//[Do not override] Added by UI to update directly any widget: e.g. : myWidget.update()
	update : function() {}
});
