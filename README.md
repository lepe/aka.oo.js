# widgets.ui.js
JS Widget oriented framework using transparency.js + chic.js + require.js + jquery

Its main goal is to create Web applications using "Widgets" which can be reused, expanded and updated easily.

This framework uses:
* [require.js](https://github.com/requirejs/requirejs) to automatically download required Javascript files (on demand).
* [chic.js](https://github.com/rowanmanning/chic) as a base Class model, which allows an easy extension of Widgets*
* [transparency.js](https://github.com/leonidas/transparency) to interact with the HTML elements in a simpler way.
* JQuery to simplify code

There are mainly 2 classes:
### UI.js
This class is used to create the general user interface. It also controls the communication with the server and initialize the Widgets.

Example Usage: 

```javascript
require(
    ["HelloWidget","TimeWidget"], //Which Widgets you are using
    function(){
        var helloW = new HelloWidget();
        var timeW = new TimeWidget();
        $("#main").appendWidget(helloW); // "appendWidget" will append the Widget to specified element.
        $("#right").addWidget(timeW); //Used "addWidget" here to place only once (using JQuery's "html" function)
        //$("#main").doWidgets(); <-- selective initialization (any JQuery selector can be used)
        $.ui.doWidgets(); //<--global (initialize all widgets)
        setInterval(function(){
            timeW.update(); //Will update the widget every second
        }, 1000);
    }
);
```

### Widget.js
This class serves as a base for all possible Widgets, so all widgets should extend this class. You can extend your widgets in the same way to create more specific widgets.

Example:

```javascript
define(
    ["Widget"],  //depends on
    function(){
        TimeWidget = Widget.extend({
            template : "time",
            request  : "currtime", //If ommited, it will use template name as request parameter
            render   : function(data, callback) {
                //This callback uses "transparency.js". To understand it, please check transparency.js documentation.
                callback({
                    models: data, //Object used as data provider
                    directives: { 
                        mytime : { //Can be a class or id
                            text : function () { return this.d; } //this.d is: model.d (data.d comes from the server response)
                        }
                    }
                });
            }
        });
    }
);
```
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
      echo $_GET["callback"]."(".json_encode($res).")";
  }
?>
```

## Initial settings

By default require.js is set to search required javascript files at "/js" URL. You can change it by setting:
```javascript
requirejs.config({
    baseUrl: 'https://example.com/cdn/js'
});
```
The default server is set to: "/php/proxy.php". You can change it by setting:
```javascript
jQuery.ui.baseurl = "https://example.com/cgi/myresponse";
```

## Status

To be sincere, I haven't have the chance to test this code in a complex project. I started this framework for an online game tracker which was not finalized due to my busy schedule. However I think it is useful as it is. That's why I decided to share it. I will try to use it in future projects in order to improve it.

## When to use it?

I think this framework is specially benefical for monitoring systems. If you are going to start a new project which contains many different kind of widgets, then I think you may find useful this small piece of code.

If your project has complex interactions between widgets (or pieces of code), I would recommend to use AngularJS, which helps you to keep such relations updated easily. However, if your current system is using JQuery and you are looking for greater abstraction and modularity, then I think this framework may be good for you.







