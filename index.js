const conf = require('./lib/config')()
const debug = require('debug')('catbot:main')
const makeCat = require('./lib/catBoard')

// console.log(`
// //           \`*-.
// //            )  _\`-.
// //           .  : \`. .
// //           : _   '  \
// //           ; *\` _.   \`*-._
// //           \`-.-'          \`-.
// //             ;       \`       \`.
// //             :.       .        \
// //             . \  .   :   .-'   .
// //             '  \`+.;  ;  '      :
// //             :  '  |    ;       ;-.
// //             ; '   : :\`-:     _.\`*
// //          .*' /  .*' ; .*\`- +'  \`*'
// // .        \`*-*   \`*-*  \`*-*'\`)
// `)

const opt = {
  hwJoystick: true,
  catConf: conf
}

debug(conf)
const kitty = makeCat(opt)
const khw = kitty.hw

kitty.board.on('ready', function () {
  debug('board is ready')
  kitty.laser.on()
  kitty.to([90, 90])
})

// const five = require('johnny-five')



// console.log(getConf)
