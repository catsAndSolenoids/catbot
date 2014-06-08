var five = require('johnny-five'),
    opt = require('node-getopt').create([
      ['P' , 'port=ARG'   , 'set the port of the kitty if needed'],
      ['h' , 'help'                , 'display this help'],
      ['v' , 'version'             , 'show version']
    ])              // create Getopt instance for the kitty
    .bindHelp()     // bind option 'help' to default action
    .parseSystem();

module.exports = function (cb) {

  var board;
    // if the port is specified assign it
      board    = new five.Board({
        port: opt.options.port
  });

  board.on('ready', function() {
    var laser      = new five.Led(12)
      , onlineLed  = new five.Led(13)
      , servoX     = new five.Servo(10)
      , servoY     = new five.Servo(9)
      ,reset
      ;
      reset= function() {
        servoX.stop();
        servoY.stop();
        servoX.center();
        servoY.center();
      };
    //
    // blinking a laser is a really bad idea
    // or maybe its awesome...
    //
    laser.blink = { state:false };

    board.repl.inject({
      servoX:servoX,
      servoY:servoY,
      laser:laser,
      onlineLed: onlineLed,
      reset:reset
    });

    //
    // center the servos
    //
    servoX.center();
    servoY.center();

    console.log('we have started our CDD (cat distraction device)');

    return cb(null,
      { board  : board
      , x      : servoX
      , y      : servoY
      , online : onlineLed
      , laser  : laser
      , rst    : reset
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