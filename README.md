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

get docs at http://catremote.herokuapp.com/help
