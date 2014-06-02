# CATBOT

to use the cat bot you need to require it ... 

``` javascript
var catbot = require('catbot');

catbot(function (error, hardware) {
	/*
	Called when Board ready. Use your robot:
	hardware = {
	    board  : Board
	  , x      : Servo
	  , y      : Servo
	  , online : Led
	  , laser  : Led
	}
	*/
})
```


you can also specify the port from the command line as follow

```node cat.js -P /dev/cu.usbmodem1421```


get docs at http://catremote.herokuapp.com/help
