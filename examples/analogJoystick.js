/*
basic use of the analog joystick
*/
const catbot = require('../index')

const opts = {
  hwJoystick: true // this enable the harware joystick
}

function catCb (err, hardware) {
  if (err) throw err
  hardware.laser.on() // set the laser on
}

catbot(catCb, opts) // catCb will be ran when the board is ready
