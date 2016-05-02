//Place where JS are stored:
requirejs.config({
    baseUrl: '/js'
});
//Set UI config. 
var WidgetUI = new UI();
WidgetUI.baseurl = '/php/proxy.php'; //Server location

//Example of shortcuts (recommended):
jQuery.fn.appendWidget = function(widget) {
    return WidgetUI.addWidget("append", widget, this);
};
jQuery.fn.prependWidget = function(widget) {
    return WidgetUI.addWidget("prepend", widget, this);
};
jQuery.fn.placeWidget = function(widget) {
    return WidgetUI.addWidget("html", widget, this);
};
jQuery.fn.doWidgets = function() {
    return WidgetUI.doWidgets($(this));
};
