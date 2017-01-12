const five = require('johnny-five')
const debug = require('debug')('catbot:board')
const utils = require('./utils')
const applyDeadzone = utils.applyDeadzone
const rng = utils.convertRange
function makeCat (opts) {
  const cat = {hw: {}}
  debug('opts')
  debug(opts)
  if (!opts.boardOpt) opts.boardOpt = {repl: false}
  cat.board = new five.Board(opts)
  cat.board.on('ready', function () {
    debug('board is ready')
    const laser = new five.Led(12)
    const servoX = new five.Servo({pin: 10, startAt: 90, range: [10, 170]})
    const servoY = new five.Servo({pin: 11, startAt: 90, range: [10, 170]})
    if (opts.hwJoystick) {
      debug('init hwJoystick')
      const hwJoy = new five.Joystick({
        pins: ['A0', 'A1']
      })

      const button = new five.Button({
        pin: 9,
        isPullup: true
      })

      hwJoy.on('change', function () {
        const X = applyDeadzone(this.x, 0.25)
        const Y = applyDeadzone(this.y, 0.25)
        
        if (X !== 0 || Y !== 0) {
          servoX.to(rng(this.x, [1, -1], [10, 170]))
          servoY.to(rng(this.y, [1, -1], [10, 170]))
          // console.log('Joystick')
          // console.log('  x : ', this.x)
          // console.log('  y : ', this.y)
          // console.log('--------------------------------------')
        }
      })

      button.on('up', function () {
        laser.toggle()
      })
        
      cat.hw.hwJoy = hwJoy
      cat.to = function (pos, servos) {
        if (!servos) servos = [servoX, servoY]
        servos[0].to(pos[0])
        servos[1].to(pos[1])
      }
    }
    cat.laser = laser
    cat.servoX = servoX
    cat.servoY = servoY
    // debug(cat)
  })
  // hw.laser = new five.Led(12)
  return cat
}

module.exports = makeCat
