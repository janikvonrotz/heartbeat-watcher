# Hearteat Watcher

Heartbeat Watcher is a simple server that repeatedly checks the heartbeat index of an elasticsearch node and reports unavailable sites.

## Config

Heartbeat Watcher load configuration from the `heartbeatwatcher.yml` file.

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

Either add them to an `.env` file or pass them to the docker image.

# Docker

Heartbeat Watcher is available as docker container. Mount the configuration file in order to run the application.

`docker run -i -p 3000:3000 -v ${PWD}/heartbeatwatcher.yml:/usr/src/app/heartbeatwatcher.yml heartbeat-watcher:latest`

# Build

Build docker container with the following command.

`docker build -t heartbeat-watcher:latest .`