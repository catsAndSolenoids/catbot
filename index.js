var five = require('johnny-five');

module.exports = function (cb) {
  var board    = new five.Board();

  board.on('ready', function() {
    var laser      = new five.Led(12)
      , onlineLed  = new five.Led(13)
      , servoX     = new five.Servo(10)
      , servoY     = new five.Servo(9)
      , servoX2     = new five.Servo(11)
      ;

    //
    // blinking a laser is a really bad idea
    // or maybe its awesome...
    //
    laser.blink = { state:false };

    board.repl.inject({
      servoX:servoX,
      servoX2:servoX2,
      servoY:servoY,
      laser:laser,
      onlineLed: onlineLed
    });

    //
    // center the servos
    //
    servoX.center();
    servoX2.center();
    servoY.center();

    console.log('we have started our CDD (cat distraction device)');

    return cb(null, 
      { board  : board
      , x      : servoX
      , y      : servoY
      , online : onlineLed
      , laser  : laser,
      , x2     : servoX2
      });

  });
}


//           \`*-.                    
//            )  _`-.                 
//           .  : `. .                
//           : _   '  \               
//           ; *` _.   `*-._          
//           `-.-'          `-.       
//             ;       `       `.     
//             :.       .        \    
//             . \  .   :   .-'   .   
//             '  `+.;  ;  '      :   
//             :  '  |    ;       ;-. 
//             ; '   : :`-:     _.`* ;
//          .*' /  .*' ; .*`- +'  `*' 
// .        `*-*   `*-*  `*-*'        