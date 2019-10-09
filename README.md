# Hearteat Watcher

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

## Docker

Heartbeat Watcher is available as docker image. Mount the configuration file in order to run the application.

`docker run -i -p 3000:3000 -v ${PWD}/heartbeatwatcher.yml:/usr/src/app/heartbeatwatcher.yml heartbeat-watcher:1.0.0`

### Build

Build docker container with the following command.

`docker build -t heartbeat-watcher:1.0.0 .`

### Publish

Tag the docker image and publish to the target repo.

```bash
docker tag heartbeat-watcher:1.0.0 HOSTNAME:PORT/heartbeat-watcher:1.0.0
docker push HOSTNAME:PORT/heartbeat-watcher:1.0.0
```