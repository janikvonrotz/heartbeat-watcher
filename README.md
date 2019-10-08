# Hearteat Watcher

The Heartbeat Watcher is a simple server that repeatedly checks the `heartbeat` index of an elasticsearch and reports unavilable sites.

## Environment

The following env variables must be configured.

```bash
ELASTICSEARCH_HOST="https://HOSTNAME:9200"
ELASTICSEARCH_USERNAME="USERNAME"
ELASTICSEARCH_PASSWORD="PASSWORD"
SCHEDULE_MINUTES=1
SMTP_HOST="HOSTNAME"
SMTP_PORT="PORT"
SMTP_USERNAME="USERNAME"
SMTP_PASSWORD="PASSWORD"
MAIL_FROM="DISPLAYNAME" <NAME@EXAMPLE.COM>
MAIL_TO=NAME@EXAMPLE.COM
```

Either add them to an `.env` file or pass them to the docker image.