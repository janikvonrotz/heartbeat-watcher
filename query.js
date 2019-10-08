const { Client } = require('@elastic/elasticsearch')

// Create elasticsearch client
const client = new Client({
  node: process.env.ELASTICSEARCH_HOST,
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD
  }
})

async function run () {
  // Search for sites with summary down
  const { body } = await client.search({
    index: 'heartbeat*',
    body: {
      _source: ['url.full'],
      query: {
        bool: {
          must: [
            {
              match: {
                'summary.down': 0
              }
            }
          ],
          filter: [
            {
              range: {
                '@timestamp': {
                  gte: `now-${process.env.SCHEDULE_MINUTES}m`
                }
              }
            }
          ]
        }
      }
    }
  })

  return body.hits.hits
}

module.exports = run
