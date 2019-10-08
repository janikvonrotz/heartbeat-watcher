require('dotenv').config()
const express = require('express')
const query = require('./query')

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || '0.0.0.0'

var date = new Date()
var results

async function intervalFunc () {
  results = await query()
  date = new Date()
}

const app = express()
app.get('/', (req, res) => {
  res.json({
    last_check: date.toISOString(),
    results: results
  })
})

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`)
})

setInterval(intervalFunc, process.env.SCHEDULE_MINUTES * 60 * 1000)
