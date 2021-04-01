// 创建索引
PUT /order_idx/
{
    "mappings": {
        "properties": {
            "id": {
                "type": "keyword",
                "store": true
            },
            "status": {
                "type": "keyword",
                "store": true
            },
            "pay_money": {
                "type": "double",
                "store": true
            },
            "payway": {
                "type": "byte",
                "store": true
            },
            "userid": {
                "type": "keyword",
                "store": true
            },
            "operation_date": {
                "type": "date",
                "format": "yyyy-MM-dd HH:mm:ss",
                "store": true
            },
            "category": {
                "type": "keyword",
                "store": true
            }
        }
    }
}

// 二、统计不同支付方式的的订单数量
// 1. 基于JSON DSL实现方式(比较复杂)
GET /order_idx/_search
{
    "size": 0,
    "aggs": {
        "group_by_state": {
            "terms": {
                "field": "payway"
            }
        }
    }
}

// 2. 基于ES SQL来实现
GET /_sql?format=txt
{
    "query": "select payway, count(*) cnt from order_idx group by payway"
}

// 统计不同支付方式订单数，并按照订单数量倒序排序
GET /_sql?format=txt
{
    "query": "select payway, count(*) cnt from order_idx group by payway order by cnt desc"
}

// 只统计「已付款」状态的不同支付方式的订单数量
GET /_sql?format=txt
{
    "query": "select payway, count(*) cnt from order_idx where status = '已付款' group by payway order by cnt desc"
}

// 统计不同用户的总订单数量、总订单金额
GET /_sql?format=txt
{
    "query": "select userid, count(*) cnt, sum(pay_money) total_money from order_idx group by userid order by cnt desc"
}