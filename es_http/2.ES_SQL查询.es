// 1. 查询职位索引库中的一条数据
GET /_sql?format=json
{
    "query": "select * from job_idx limit 1"
}

// 将SQL语句翻译成JSON DSL
GET /_sql/translate
{
    "query": "SELECT * FROM job_idx limit 1"
}

// 2. 进行Scroll分页查询
// 2.1 第一次查询
GET /_sql?format=json
{
    "query": "SELECT * FROM job_idx",
    "fetch_size": 10,
    "page_timeout": "10m"
}

// 2.2 第二次查询
GET /_sql?format=json
{
    "cursor": "5/WuAwFaAXNARFhGMVpYSjVRVzVrUm1WMFkyZ0JBQUFBQUFBQUFBTVdhMmRIWDNoQ1Z6ZFRkRk01YUdSa1MyUXRWMEZ6UVE9Pf////8PCQFmBGFyZWEBBGFyZWEBBHRleHQAAAABZgNjbXABA2NtcAEEdGV4dAAAAAFmA2VkdQEDZWR1AQdrZXl3b3JkAQAAAWYDZXhwAQNleHABBHRleHQAAAABZgJqZAECamQBBHRleHQAAAABZghqb2JfdHlwZQEIam9iX3R5cGUBB2tleXdvcmQBAAABZgJwdgECcHYBB2tleXdvcmQBAAABZgZzYWxhcnkBBnNhbGFyeQEHa2V5d29yZAEAAAFmBXRpdGxlAQV0aXRsZQEEdGV4dAAAAAL/AQ=="
}

// 2.3 关闭游标（关闭快照）
POST /_sql/close
{
    "cursor": "5/WuAwFaAXNARFhGMVpYSjVRVzVrUm1WMFkyZ0JBQUFBQUFBQUFBTVdhMmRIWDNoQ1Z6ZFRkRk01YUdSa1MyUXRWMEZ6UVE9Pf////8PCQFmBGFyZWEBBGFyZWEBBHRleHQAAAABZgNjbXABA2NtcAEEdGV4dAAAAAFmA2VkdQEDZWR1AQdrZXl3b3JkAQAAAWYDZXhwAQNleHABBHRleHQAAAABZgJqZAECamQBBHRleHQAAAABZghqb2JfdHlwZQEIam9iX3R5cGUBB2tleXdvcmQBAAABZgJwdgECcHYBB2tleXdvcmQBAAABZgZzYWxhcnkBBnNhbGFyeQEHa2V5d29yZAEAAAFmBXRpdGxlAQV0aXRsZQEEdGV4dAAAAAL/AQ=="
}

// 3. 检索title和jd中包含hadoop的职位。
GET /_sql?format=txt
{
    "query": "select * from job_idx where match(title, 'hadoop') or match(jd, 'hadoop')"
}

