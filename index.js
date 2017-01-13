const five = require('johnny-five')

const chalk = require('chalk')
const green = chalk.green
const blue = chalk.cyan

const debug = require('debug')('catbot:board')
const utils = require('./lib/utils')
const applyDeadzone = utils.applyDeadzone
const rng = utils.convertRange
const getConf = require('./lib/config')

function makeCat (catCb, opts) {
  console.log(green(msg))
  if (!catCb) {
    catCb = function () {
      debug('no cb provided')
    }
  }
  if (!opts) opts = {}
  if (!opts.boardOpt) opts.boardOpt = {repl: false}
  if (!opts.catConf) {
    opts.catConf = getConf()
  } else {
    opts.catConf = getConf(opts.catConf)
  }
  if (!opts.inputRange) {
    debug('inputRange missing')
    if (opts.catConf.inputRange) {
      opts.inputRange = [opts.catConf.inputRange[0], opts.catConf.inputRange[1]]
    } else {
      opts.inputRange = [0, 180]
    }
  }
  if (!opts.servoRange) {
    debug('servorange missing')
    if (opts.catConf.servoRange) {
      opts.servoRange = [opts.catConf.servoRange[0], opts.catConf.servoRange[1]]
    } else {
      opts.servoRange = [0, 180]
    }
  }
  debug('input', opts.inputRange, 'servo', opts.servoRange)
  // debug('opts')
  // debug(opts.catConf.hw)

  const hw = opts.catConf.hw
  const cat = {hw: {}}

  cat.board = new five.Board(opts.boardOpt)
  cat.board.on('ready', function () {
    debug('board is ready')
    console.log(blue('catbot is ready to use'))
    const laser = new five.Led(hw.laser.pin)
    const servoX = new five.Servo({pin: hw.servoX.pin, startAt: 90, range: opts.servoRange})
    const servoY = new five.Servo({pin: hw.servoY.pin, startAt: 90, range: opts.servoRange})

    // if analog joystick is enabled
    if (opts.hwJoystick || opts.catConf.hwJstk) {
      let joyTimer
      let isJoyOn = false
      debug('init hwJoystick')
      console.log(green('Joystick configured'))
      console.log(blue('Press the joystick button for 2 sec to enable/disable it, quick press to toggle laser'))
      const hwJoy = new five.Joystick({
        pins: [hw.jstk.x, hw.jstk.y]
      })

      const button = new five.Button({
        pin: 9,
        isPullup: hw.jstk.isPullup
      })

      hwJoy.on('change', function () {
        if (isJoyOn === true) {
          const X = applyDeadzone(this.x, hw.jstk.deadZone)
          const Y = applyDeadzone(this.y, hw.jstk.deadZone)
          debug(X, Y)
          if (X !== 0 || Y !== 0) {
            servoX.to(rng(this.x, [1, -1], opts.servoRange))
            servoY.to(rng(this.y, [1, -1], opts.servoRange))
          } else {
            servoX.to(rng(0, [1, -1], [10, 170]))
            servoY.to(rng(0, [1, -1], [10, 170]))
          }
        }
      })

      button.on('up', function () {
        clearTimeout(joyTimer)
        laser.toggle()
      })
      button.on('down', function () {
        console.log(blue('hold 2 sec to toggle joymode'))
        joyTimer = setTimeout(function () {
          isJoyOn = !isJoyOn
          console.log(blue('joyMode:'), isJoyOn)
        }, 2000)
      })

      // export a ref to the hardware to the cat object
      cat.hwJoy = hwJoy
    }

    /**
     * orient the turret to the passed positions
     *
     * @param {Array} pos array of 2 value pos X and Y {numbers}
     * @param {Array} [servos] optional array of j5 servos obj
     */
    cat.to = function (pos, servos) {
      debug('cat.to called')
      if (!servos) servos = [servoX, servoY]
      servos[0].to(rng(pos[0], opts.inputRange, opts.servoRange))
      servos[1].to(rng(pos[1], opts.inputRange, opts.servoRange))
    }

    // enable inject hardware to REPL if REPL is enabled
    if (opts.boardOpt.repl === true) {
      console.log(green('REPL mode enabled'))
      cat.board.repl.inject({
        x: servoX,
        y: servoY,
        laser: laser,
        to: cat.to
      })
    }

    // export a ref to the hardware to the cat object
    cat.laser = laser
    cat.x = servoX
    cat.y = servoY
    return catCb(null, cat)
  })
}

const msg = `
            \`*-.
             )  _\`-.
            .  : \`. .
            : _   '  \\
            ; *\` _.   \`*-._
            \`-.-'          \`-.
              ;       \`       \`.
              :.       .        \\
              . \\  .   :   .-'   .
              '  \`+.;  ;  '      :
              :  '  |    ;       ;-.
              ; '   : :\`-:     _.\`*
           .*' /  .*' ; .*\`- +'  \`*'
  .        \`*-*   \`*-*  \`*-*'\`)
`

module.exports = makeCat
