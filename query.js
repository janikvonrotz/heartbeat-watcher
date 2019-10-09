const { Client } = require('@elastic/elasticsearch')
const { SCHEDULE, ELASTICSEARCH } = require('./config')

// Create elasticsearch client
const client = new Client({
  node: ELASTICSEARCH.HOST,
  auth: {
    username: ELASTICSEARCH.USERNAME,
    password: ELASTICSEARCH.PASSWORD
  }
})

async function query () {
  // Search sites with summary down
  const { body } = await client.search({
    index: 'heartbeat*',
    body: {
      _source: ['url.full'],
      query: {
        bool: {
          must: [
            {
              match: {
                'summary.down': 1
              }
            }
          ],
          filter: [
            {
              range: {
                '@timestamp': {
                  gte: `now-${SCHEDULE.MINUTES}m`
                }
              }
            }
          ]
        }
      }
    }
  })

  // console.log('QUERY', body.hits.hits)

  return body.hits.hits
}

module.exports = query
