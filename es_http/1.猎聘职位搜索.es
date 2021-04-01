PUT /job_idx
{
    "mappings": {
        "properties" : {
            "area": { "type": "text", "store": true},
            "exp": { "type": "text", "store": true},
            "edu": { "type": "keyword", "store": true},
            "salary": { "type": "keyword", "store": true},
            "job_type": { "type": "keyword", "store": true},
            "cmp": { "type": "text", "store": true},
            "pv": { "type": "keyword", "store": true},
            "title": { "type": "text", "store": true},
            "jd": { "type": "text", "store": true}
        }
    }
}

// 查看索引的映射
GET /job_idx/_mapping

// 查看所有的索引
GET _cat/indices

// 删除索引
delete /job_idx

// 使用IK分词器来指定对哪些字段进行分词
PUT /job_idx
{
    "mappings": {
        "properties" : {
            "area": { "type": "text", "store": true, "analyzer": "ik_max_word"},
            "exp": { "type": "text", "store": true, "analyzer": "ik_max_word"},
            "edu": { "type": "keyword", "store": true},
            "salary": { "type": "keyword", "store": true},
            "job_type": { "type": "keyword", "store": true},
            "cmp": { "type": "text", "store": true, "analyzer": "ik_max_word"},
            "pv": { "type": "keyword", "store": true},
            "title": { "type": "text", "store": true, "analyzer": "ik_max_word"},
            "jd": { "type": "text", "store": true, "analyzer": "ik_max_word"}
        }
    }
}

// 新增一条数据
PUT /job_idx/_doc/29097
{
    "area": "深圳-南山区",
    "exp": "1年经验",
    "edu": "大专以上",
    "salary": "6-8千/月",
    "job_type": "实习",
    "cmp": "乐有家",
    "pv": "61.6万人浏览过  / 14人评价  / 113人正在关注",
    "title": "桃园 深大销售实习 岗前培训",
    "jd": "薪酬待遇】 本科薪酬7500起 大专薪酬6800起 以上无业绩要求，同时享有业绩核算比例55%~80% 人均月收入超1.3万 【岗位职责】 1.爱学习，有耐心： 通过公司系统化培训熟悉房地产基本业务及相关法律、金融知识，不功利服务客户，耐心为客户在房产交易中遇到的各类问题； 2.会聆听，会提问： 详细了解客户的核心诉求，精准匹配合适的产品信息，具备和用户良好的沟通能力，有团队协作意识和服务意识； 3.爱琢磨，善思考: 热衷于用户心理研究，善于从用户数据中提炼用户需求，利用个性化、精细化运营手段，提升用户体验。 【岗位要求】 1.18-26周岁，自考大专以上学历； 2.具有良好的亲和力、理解能力、逻辑协调和沟通能力； 3.积极乐观开朗，为人诚实守信，工作积极主动，注重团队合作； 4.愿意服务于高端客户，并且通过与高端客户面对面沟通有意愿提升自己的综合能力； 5.愿意参加公益活动，具有爱心和感恩之心。 【培养路径】 1.上千堂课程;房产知识、营销知识、交易知识、法律法规、客户维护、目标管理、谈判技巧、心理学、经济学; 2.成长陪伴：一对一的师徒辅导 3.线上自主学习平台：乐有家学院，专业团队制作，每周大咖分享 4.储备及管理课堂： 干部训练营、月度/季度管理培训会 【晋升发展】 营销【精英】发展规划：A1置业顾问-A6资深置业专家 营销【管理】发展规划：（入职次月后就可竞聘） 置业顾问-置业经理-店长-营销副总经理-营销副总裁-营销总裁 内部【竞聘】公司职能岗位：如市场、渠道拓展中心、法务部、按揭经理等都是内部竞聘 【联系人】 黄媚主任15017903212（微信同号）"
}

// 更新指定文档的某个字段的数据
POST /job_idx/_update/29097
{
    "doc": {
        "salary": "15-20千/月"
    }
}

// 删除ES索引中的文档
DELETE /job_idx/_doc/29097

// 查询指定ID的文档
GET /job_idx/_search
{
    "query": {
        "ids": {
            "values": ["1"]
        }
    }
}

// 关键字检索
GET  /job_idx/_search 
{
    "query": {
        "match": {
            "jd": "hive"
        }
    }
}

// 分页查询
GET  /job_idx/_search
{
    "from": 10,
    "size": 5,
    "query": {
        "multi_match": {
            "query": "销售",
            "fields": ["title", "jd"]
        }
    }
}

// 使用ES的scroll分页查询
// 解决深分页的问题
GET /job_idx/_search?scroll=1m
{
    "query": {
        "multi_match": {
            "query": "销售",
            "fields": ["title", "jd"]
        }
    },
    "size": 100
}

// DXF1ZXJ5QW5kRmV0Y2gBAAAAAAAAAA4WMU81aWZhVXVRWDJXcjJrclNlajhKdw==
GET _search/scroll?scroll=1m
{
    "scroll_id": "DXF1ZXJ5QW5kRmV0Y2gBAAAAAAAAAA4WMU81aWZhVXVRWDJXcjJrclNlajhKdw=="
}

// 创建指定分片数量、副本数量的索引
PUT /job_idx_shard
{
    "mappings": {
        "properties": {
            "id": { "type": "long", "store": true },
            "area": { "type": "keyword", "store": true },
            "exp": { "type": "keyword", "store": true },
            "edu": { "type": "keyword", "store": true },
            "salary": { "type": "keyword", "store": true },
            "job_type": { "type": "keyword", "store": true },
            "cmp": { "type": "keyword", "store": true },
            "pv": { "type": "keyword", "store": true },
            "title": { "type": "text", "store": true },
            "jd": { "type": "text"}

        }
    },
    "settings": {
        "number_of_shards": 3,
        "number_of_replicas": 2
    }
}
