# Hearteat Watcher

Heartbeat Watcher is a simple server that repeatedly checks the heartbeat index of an elasticsearch node and reports unavailable sites.

## Config

Heartbeat Watcher load configuration from the `heartbeat-watcher.yml` file.

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