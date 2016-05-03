# widgets.ui.js
Its main goal is to create Web applications using "Widgets" which can be reused, expanded and updated easily.

* [Demo](http://widgets_ui.alepe.com/)
* [Download Demo](https://github.com/lepe/widgets.ui.js/archive/master.zip) *Recommended
* [Download library only (2K)](https://raw.githubusercontent.com/lepe/widgets.ui.js/master/js/widgets.ui.js)
* [Download Bundle (12K)](https://github.com/lepe/widgets.ui.js/raw/master/widgets.ui.bundle.zip) 

This framework uses:
* [require.js](https://github.com/requirejs/requirejs) to automatically download required Javascript files (on demand).
* [chic.js](https://github.com/rowanmanning/chic) as a Class based model (which allows to use JS object as classes)
* [transparency.js](https://github.com/leonidas/transparency) to interact with the HTML elements in a simpler way.
* JQuery to simplify code

### What do you need to test it?

You need the above 4 dependencies (I have prepared a minimized version of the first 3): [widgets.ui.depend.js](https://github.com/lepe/widgets.ui.js/blob/master/js/widgets.ui.depend.js), the library file [widgets.ui.js](https://github.com/lepe/widgets.ui.js/blob/master/js/widgets.ui.js) and the configuration file [widgets.ui.config.js](https://github.com/lepe/widgets.ui.js/blob/master/js/widgets.ui.config.js). All those files are included in "Download Bundle" and in the "Download Demo" (from the links above).

There are mainly 2 classes:
### UI
This class is used to create the general user interface. It also controls the communication with the server and initialize the Widgets.

Example Usage [demo.js](https://github.com/lepe/widgets.ui.js/blob/master/js/demo.js): 

```javascript
require(
    ["HelloWidget","TimeWidget"], //Which Widgets you are using
    function(){
        var helloW = new HelloWidget();
        var timeW = new TimeWidget();
        $("#main").appendWidget(helloW); // "appendWidget" will append the Widget to specified element.
        $("#right").placeWidget(timeW); // "placeWidget" will insert a widget only once (using JQuery's "html" function)
        //$("#main").doWidgets(); <-- selective initialization (any JQuery selector can be used)
        WidgetUI.doWidgets(); //<--global (initialize all widgets: using specified global object)
        setInterval(function(){
            timeW.update(); //Will update the widget every second
        }, 1000);
    }
);
```

### Widget
This class serves as a base for all possible Widgets, so all widgets should extend this class. You can extend your widgets in the same way to create more specific widgets.

Example: [TimeWidget.js](https://github.com/lepe/widgets.ui.js/blob/master/js/TimeWidget.js)

```javascript
define(
    [],  //Which Widgets depend on (to load JS file). For example: "basicWidget"
    function(){
        TimeWidget = Widget.extend({ //If you want to extend "basicWidget", use ... = basicWidget.extend({ ...
            template : "time",
            request  : "currtime", //If omitted, it will use template name as request parameter: ?req=time
            directives : function(data) {
                return {
                    mytime : {
                        text : function () { return this.d; } //'this' is corresponding to "data"
                    }
                }
            }			
        });
    }
);
```
see: [Widget.src.js](https://github.com/lepe/widgets.ui.js/blob/master/src/Widget.src.js) to see widget options.


"time.htm" template:
```html
<div class="timer">
    <time class="mytime"></time>
</div>
```

"proxy.php" (example file used as server response):
```php
<?php
  header('Content-Type: application/json; charset=utf8');
  if($_GET["req"] == "currtime") {
      $res = array("d" => date("Y-m-d H:i:s"));
      if(isset($_GET["callback"])) {
         echo $_GET["callback"]."(".json_encode($res).")";
      } else {
         echo json_encode($res);
      }

  }
?>
```

## Initial settings 
(see: [widgets.ui.config.js](https://github.com/lepe/widgets.ui.js/blob/master/js/widgets.ui.config.js))

By default require.js is set to search required javascript files at "/js" URL. You can change it by setting:
```javascript
requirejs.config({
    baseUrl: 'https://example.com/cdn/js'
});
```
You must specify where is your server and your templates (htm files):
```javascript
WidgetUI = new UI();
WidgetUI.server = "https://example.com/cgi/myresponse";
WidgetUI.templates = "/templates/";
```

## Status

To be sincere, I haven't have the chance to test this code in a complex project. I started this framework for an online game tracker which was not finalized due to my busy schedule. However I think it is useful as it is (that's why I decided to share it). I will keep improving it as much as I can.

## When to use it?

I think this framework is specially benefical for monitoring systems. If you are going to start a new project which contains many different kind of widgets, then I think you may find it useful.

If your project has complex interactions between widgets (or pieces of code), I would recommend to use AngularJS, which helps you to keep such relations updated easily. However, if your current system is using JQuery and you are looking for greater abstraction and modularity, then I think this framework could be good for you.







