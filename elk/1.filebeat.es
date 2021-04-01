GET /filebeat-7.6.1-2020.09.15-000001/_search
{
    "query": {
        "match": {
            "log.file.path": "/var/kafka/log/server.log.2020-09-10"
        }
    }
}

delete filebeat-7.6.1-2020.09.15-000001