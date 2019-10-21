# Heartbeat Watcher

Heartbeat Watcher is a simple server that repeatedly checks the heartbeat index of an elasticsearch node and reports unavailable sites.

## Config

Heartbeat Watcher loads configuration from the `heartbeatwatcher.yml` file.

```bash
SERVER:
  HOST: "0.0.0.0"
  PORT: 3000
ELASTICSEARCH:
  HOST: "https://HOSTNAME:9200"
  USERNAME: "USERNAME"
  PASSWORD: "PASSWORD"
SCHEDULE:
  MINUTES: 5
SMTP:
  HOST: "HOSTNAME"
  PORT: 587
  USERNAME: "AME@EXAMPLE.COM"
  PASSWORD: "PASSWORD"
MAIL:
  FROM: "\"DISPLAYNAME" <AME@EXAMPLE.COM>"
  TO: "AME@EXAMPLE.COM"
  KIBANA:
    URL: "https://HOSTNAME/app/uptime"
```

or from environment variables.

```bash
SERVER_HOST: "0.0.0.0"
SERVER_PORT: 3000
ELASTICSEARCH_HOST: "https://HOSTNAME:9200"
ELASTICSEARCH_USERNAME: "USERNAME"
ELASTICSEARCH_PASSWORD: "PASSWORD"
SCHEDULE_MINUTES: 5
SMTP_HOST: "HOSTNAME"
SMTP_PORT: 587
SMTP_USERNAME: "AME@EXAMPLE.COM"
SMTP_PASSWORD: "PASSWORD"
MAIL_FROM: "\"DISPLAYNAME\" <AME@EXAMPLE.COM>"
MAIL_TO: "AME@EXAMPLE.COM"
MAIL_KIBANA_URL: "https://HOSTNAME/app/uptime"
```

If both options are configured, it will merge the configurations.

## Docker

Heartbeat Watcher is available as docker image. Mount the configuration file in order to run the application.

`docker run -i -p 3000:3000 -v ${PWD}/heartbeatwatcher.yml:/usr/src/app/heartbeatwatcher.yml heartbeat-watcher:$BUILDNUMER`

### Build

Build docker container with the following command.

`docker build -t heartbeat-watcher:$BUILDNUMBER .`

### Publish

Tag the docker image and publish to the target repo.

```bash
docker tag heartbeat-watcher:$BUILDNUMBER HOSTNAME:PORT/heartbeat-watcher:$BUILDNUMBER
docker push HOSTNAME:PORT/heartbeat-watcher:$BUILDNUMBER
```