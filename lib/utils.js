/**
 * apply a deadzone on the joystick inputs
 *
 * @param {number} number value from the joystick
 * @param {number} threshold of the axe
 * @returns {number} deadzoned value
 */
var applyDeadzone = function (number, threshold) {
  let percentage = (Math.abs(number) - threshold) / (1 - threshold)

  if (percentage < 0) {
    percentage = 0
  }

  return percentage * (number > 0 ? 1 : -1)
}

/**
 * convert value from a range to another
 *
 * @param {int} value to convert
 * @param {array} r1 range of the initial value
 * @param {array} r2 desired range scale
 * @returns {int} value converted to the desired scale in the dest range
 */
function convertRange (value, r1, r2) {
  return (value - r1[ 0 ]) * (r2[ 1 ] - r2[ 0 ]) / (r1[ 1 ] - r1[ 0 ]) + r2[ 0 ]
}

module.exports = {
  applyDeadzone,
  convertRange
}
