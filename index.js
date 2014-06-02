var five = require('johnny-five'),
    opt = require('node-getopt').create([
      ['P' , 'port=ARG'   , 'set the port of the kitty if needed'],
      ['h' , 'help'                , 'display this help'],
      ['v' , 'version'             , 'show version']
    ])              // create Getopt instance for the kitty
    .bindHelp()     // bind option 'help' to default action
    .parseSystem();


module.exports = function (board,cb) {


  if (!cb) {
    cb = board;
    board = new five.Board();
  }
    // if the port is specified assign it
      board    = new five.Board({
        port: opt.options.port
  });

  board.on('ready', function() {
    var laser      = new five.Led(12)
      , onlineLed  = new five.Led(13)
      , x     = new five.Servo(10)
      , y     = new five.Servo(9)
      ,rst
      ;
    rst= function() {
      x.stop();
      y.stop();
      x.center();
      y.center();
    };
    //
    // blinking a laser is a really bad idea
    // or maybe its awesome...
    //
    laser.blink = { state:false };

    board.repl.inject({
      x:x,
      y:y,
      laser:laser,
      onlineLed: onlineLed,
      rst:rst
    });

    //
    // center the servos
    //
    x.center();
    y.center();

    console.log('we have started our CDD (cat distraction device)');

    return cb(null,
      { board  : board
      , x      : x
      , y      : y
      , online : onlineLed
      , laser  : laser
      , rst    : rst
      });

  });
};

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