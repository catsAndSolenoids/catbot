var gamepad = require('gamepad') // see https://www.npmjs.com/package/gamepad
const catbot = require('../index')

const opts = {
  catConf: {
    inputRange: [1, -1] // gamepads have a -1, 1 range, so we override default conf
  }
}

function catCb (err, hardware) {
  if (err) throw err

  let pos = [0, 0] // servo positions
  // Initialize the gamepad library
  gamepad.init()

  // Create a game loop and poll for events
  setInterval(gamepad.processEvents, 50)
  // Scan for new gamepads as a slower rate
  setInterval(gamepad.detectDevices, 500)

  // Listen for move events on gamepad 0
  gamepad.on('move', function (id, axis, value) {
    if (id === 0) {
      if (axis === 0 || axis === 1) {
        pos[axis] = value
        hardware.to(pos) // move the cat
      }
    }
  })

  // Listen for button down events on all gamepads
  gamepad.on('down', function (id, num) {
    hardware.laser.toggle() // toggle the laser
  })
}

catbot(catCb, opts) // catCb will be ran when the board is ready
