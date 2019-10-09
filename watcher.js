const query = require('./query')
const sendMail = require('./send-mail')
const { MAIL } = require('./config')
const logger = require('./logger')

async function watcher ({ lastCheckDate, results, sitesDownDetected, status }) {
  // Reset vars
  var siteAlerts = []

  // Set last check date
  lastCheckDate = new Date()

  // Get sites down
  results = await query()

  // Process results
  if (results[0]) {
    status = 'Elastic search query with results.'
    logger.info(status)

    // Process each site
    siteAlerts = results.map((result) => {
      // Check if site being down has been detected!
      const url = result._source.url.full
      if (sitesDownDetected.indexOf(url) !== -1) {
        status = `Already sent alert for site ${url}.`
        logger.warn(status)
      } else {
        status = `Site ${url} is down and requires an alert.`
        logger.error(status)
        return url
      }
    })

    // Send alerts for sites down
    if (siteAlerts[0]) {

      // Get rid of duplicates
      siteAlerts = siteAlerts.filter((value, index) => siteAlerts.indexOf(value) === index)

      const html = `
      <p>The following sites are down:</p>
      <ul>
      ${siteAlerts.map((url) => {
        return `<li><a href="${url}">${url}</a></li>`
      }).join('')}
      </ul>
      <p>See the <a href="${MAIL.KIBANA.URL}">Kibana Uptime dashboard</a> for details.</p>
      `
      sendMail('Sites Down!', html)
      status = 'Dispatched mail alert.'
      logger.info(status)

      // Add alerts to detected sites array
      siteAlerts.map((url) => {
        sitesDownDetected.push(url)
      })
    }
  } else {
    status = 'Elastic search query empty.'
    logger.info(status)

    // Check if sites have recovered
    if (sitesDownDetected[0]) {
      status = 'Recovered sites down detected.'
      logger.info(status)

      // Get rid of duplicates
      sitesDownDetected = sitesDownDetected.filter((value, index) => sitesDownDetected.indexOf(value) === index)

      // Send notice for sites recovered
      const html = `
      <p>The following sites have recovered:</p>
      <ul>
      ${sitesDownDetected.map((url) => {
        return `<li><a href="${url}">${url}</a></li>`
      }).join('')}
      </ul>
      `
      sendMail('Sites Recovered!', html)
      status = 'Dispatched email recover notice.'
      logger.info(status)

      // Clear array
      sitesDownDetected = []
    }
  }

  // Return status
  return { lastCheckDate: lastCheckDate, status: status, sitesDownDetected: sitesDownDetected }
}

module.exports = watcher
