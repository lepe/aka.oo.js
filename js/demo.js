//UI building
require(
    ["HelloWidget","TimeWidget"], //Which Widgets you are using
    function(){
        var helloW = new HelloWidget();
        var timeW = new TimeWidget();
        $("#main").appendWidget(helloW); // "appendWidget" will append the Widget to specified element.
        $("#right").placeWidget(timeW); //Used "placeWidget" here to place only once (using JQuery's "html" function)
        //$("#main").doWidgets(); <-- selective initialization (any JQuery selector can be used)
        WidgetUI.doWidgets(); //<--global (initialize all widgets)
        setInterval(function(){
            timeW.update(); //Will update the widget every second
        }, 1000);
    }
);
