
const express = require('express')
const { SERVER, SCHEDULE } = require('./config')
const watcher = require('./watcher')
const logger = require('./logger')

// Track state of watcher
var state = {
  lastCheckDate: new Date(),
  results: null,
  sitesDownDetected: [],
  status: 'starting'
}

// Create express app that shows watcher state
const app = express()
app.get('/', (req, res) => {
  res.json({
    last_check: state.lastCheckDate,
    sites_down: state.sitesDownDetected,
    status: state.status
  })
})

// Start express app
const PORT = SERVER.PORT || 8080
const HOST = SERVER.HOST || '0.0.0.0'
app.listen(PORT, HOST, () => {
  logger.info(`Running server on http://${HOST}:${PORT}`)
})

// Function that calls watcher
async function intervalFunc () {
  logger.info('Run watcher')
  state = await watcher(state)
}

// Run watcher for the first time
intervalFunc().catch(logger.error)

// Start watcher scheduling
logger.info(`Start watcher and run every ${SCHEDULE.MINUTES} minutes.`)
setInterval(intervalFunc, SCHEDULE.MINUTES * 60 * 1000)
