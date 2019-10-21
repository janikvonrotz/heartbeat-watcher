const yaml = require('js-yaml')
const fs = require('fs')
const assign = require('./assign')
require('dotenv').config()

var configEnv = {}

// supported env variables
const envVars = `
SERVER_HOST
SERVER_PORT
ELASTICSEARCH_HOST
ELASTICSEARCH_USERNAME
ELASTICSEARCH_PASSWORD
SCHEDULE_MINUTES
SMTP_HOST
SMTP_PORT
SMTP_USERNAME
SMTP_PASSWORD
MAIL_FROM
MAIL_TO
MAIL_KIBANA_URL
`.split('\n')

// Parse env variables
envVars.forEach((entry) => {
  if (process.env[entry]) {
    assign(configEnv, entry.split('_'), process.env[entry])
  }
})

// Parse yml file
var configYml = {}
try {
  configYml = yaml.safeLoad(fs.readFileSync('heartbeatwatcher.yml', 'utf8'))
} catch (error) {
  console.log(error)
}

const config = { ...configYml, ...configEnv }

module.exports = config
