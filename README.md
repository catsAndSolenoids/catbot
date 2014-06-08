# CATBOT

## TL;DR

to use the cat bot you need to require it ... 

```javascript
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
	  , rst    : Function
	}
	*/
})
```

## Use it

### instantiate the bot
see the code above.

### setup the port
from time to time J5 tries to convert my bluetooth port to an arduino, so i need to specify the port the arduino is hooked up to. 
you can spécify the desired port from the command line as an argument with the flag -P.

 ```node cat.js -P /dev/cu.usbmodem1421```

###inside the bot :
move the X axis servo to 30° ```hardware.x.to(30)``` same goes for Y

switch the laser on  ```hardware.laser.on()``` same goes for online led 

## Build it
for the moment the cat is hardwired, so to have a properly responding cat remote control device wire as follow :

- servoX 		: pin 10
- servoY 		: pin 9
- online led 	: pin 13
- laser 		: pin 12

here is a diagram of the cat wiring

![catbot wiring](http://gorhgorh.github.io/LxJsCatbot/images/03.laser.png)

the led with the transistor is the laser, my Fritzing did not have a laser module

## BOM 

see the unfinished docs in the link bellow


get the (still at work) docs [here](http://gorhgorh.github.io/LxJsCatbot/)