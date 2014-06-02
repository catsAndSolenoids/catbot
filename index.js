var five = require('johnny-five')
    , opt = require('node-getopt').create([
      ['P' , 'port=ARG'   , 'set the port of the kitty if needed'],
      ['h' , 'help'                , 'display this help'],
      ['v' , 'version'             , 'show version']
    ])              // create Getopt instance for the kitty
    .bindHelp()     // bind option 'help' to default action
    .parseSystem()
    , catOptions ={}
    ;



module.exports = function (opts,cb) {


  if(opts){
    console.log('options by require :')
    console.log(opts);
    catOptions.port = opts.port;
  }
  else if (opt){
    console.log('options by cli ARG :')
    console.log(opt.options);
    catOptions.port = opt.options.port;
  }
  else  {
    console.log('par defaut :')
    catOptions.port = '/dev/cu.usbmodem1411';
  }

    // if the port is specified assign it
    var  board    = new five.Board({
        port: catOptions.port
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