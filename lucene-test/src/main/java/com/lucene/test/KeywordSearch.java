package com.lucene.test;

import org.apache.lucene.document.Document;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.Term;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TermQuery;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.store.FSDirectory;

import java.io.IOException;
import java.nio.file.Paths;

/**
 * 基于前面Lcuene建立的索引库来进行全文检索
 * 根据关键字进行检索
 */
public class KeywordSearch {
    public static void main(String[] args) throws IOException {
        // 1. 使用DirectoryReader.open构建索引读取器
        DirectoryReader reader = DirectoryReader.open(FSDirectory.open(Paths.get("D:\\课程研发\\51.V8.0_NoSQL_MQ\\3.ElasticStack\\3.代码\\elastic_parent\\lucene_op\\index")));

        // 2. 构建索引查询器（IndexSearcher）
        // 用来搜索关键字的
        IndexSearcher indexSearcher = new IndexSearcher(reader);

        // 3. 构建词条（Term）和词条查询（TermQuery）
        TermQuery termQuery = new TermQuery(new Term("content", "人生是一条河"));

        // 4. 执行查询，获取文档
        TopDocs topDocs = indexSearcher.search(termQuery, 50);

        // 5. 遍历打印文档（可以使用IndexSearch.doc根据文档ID获取到文档）
        ScoreDoc[] scoreDocArray = topDocs.scoreDocs;
        for (ScoreDoc scoreDoc : scoreDocArray) {
            // 在Lucene中，每一个文档都有一个唯一ID
            // 根据唯一ID就可以获取到文档
            Document document = indexSearcher.doc(scoreDoc.doc);
            // 获取文档中的字段
            System.out.println("-------------");
            System.out.println("文件名：" + document.get("file_name"));
            System.out.println("文件路径：" + document.get("path"));
            System.out.println("文件内容：" + document.get("content"));
        }

        // 6. 关闭索引读取器
        reader.close();
    }
}
