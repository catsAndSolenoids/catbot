const path = require('path')
const fs = require('fs-extra')
const rc = require('rc')
const debug = require('debug')('catbot:conf')
const baseConf = fs.readJsonSync(path.join(__dirname, '/catbotrcDefault.json'))

/**
 * get the configuration using the rc module, conf is searched in all dir til the root from here walking up
 * then merge it with the default configuration
 * @returns {Object} the configuration object
 */
function getConf () {
  debug('getting catbot configiration')
  const conf = rc('catbot', baseConf)
  debug('conf', conf)
  return conf
}

module.exports = getConf
