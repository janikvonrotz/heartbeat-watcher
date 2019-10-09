const yaml = require('js-yaml')
const fs = require('fs')
const dotenv = require('dotenv')

// Parse env file
const result = dotenv.config()
if (result.error) {
  throw result.error
}
const { parsed: configEnv } = result
// console.log(configEnv)

// Parse yml file
var configYml = {}
try {
  configYml = yaml.safeLoad(fs.readFileSync('heartbeat-watcher.yml', 'utf8'))
  // console.log(configYml)
} catch (error) {
  console.log(error)
}

// TODO: combine config files

module.exports = configYml
