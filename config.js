const yaml = require('js-yaml')
const fs = require('fs')
// const dotenv = require('dotenv')

// Parse env file

// const result = dotenv.config()
// if (result.error) {
//   throw result.error
// }
// const { parsed: configEnv } = result
// console.log(configEnv)

// Parse yml file
var configYml = {}
try {
  configYml = yaml.safeLoad(fs.readFileSync('heartbeatwatcher.yml', 'utf8'))
} catch (error) {
  console.log(error)
}

module.exports = configYml
