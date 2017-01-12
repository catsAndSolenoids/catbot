const path = require('path')
const fs = require('fs-extra')
const rc = require('rc')
const debug = require('debug')('catbot:conf')
const baseConf = fs.readJsonSync(path.join(__dirname, '/catbotrcDefault.json'))
const _ = require('lodash')

/**
 * get the configuration using the rc module, conf is searched in all dir til the root from here walking up
 * then merge it with the default configuration
 * @returns {Object} the configuration object
 */
function getConf (cf) {
  // merge basic conf with possible .catbotrc files
  let conf = rc('catbot', baseConf)
  if (cf) {
    // merges it with provided options
    conf = _.merge(conf, cf)
  }
  debug('conf', conf)
  return conf
}

module.exports = getConf
