const catbot = require('../index')

const opts = {
  hwJoystick: true,
  boardOpt: {repl: true},
  catConf: {hw: {laser: {pin: 12}}}
}

function catCb (err, hardware) {
  if (err) throw err
  hardware.laser.on()
}

catbot(catCb, opts)
