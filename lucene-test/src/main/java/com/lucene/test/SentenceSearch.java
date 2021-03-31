package com.lucene.test;

import org.apache.lucene.document.Document;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.store.FSDirectory;
import org.wltea.analyzer.lucene.IKAnalyzer;

import java.io.IOException;
import java.nio.file.Paths;
import java.text.ParseException;

public class SentenceSearch {
    public static void main(String[] args) throws IOException, ParseException, org.apache.lucene.queryparser.classic.ParseException {
        // 1. 构建索引读取器
        IndexReader indexReader = DirectoryReader.open(FSDirectory.open(Paths.get("D:\\课程研发\\51.V8.0_NoSQL_MQ\\3.ElasticStack\\3.代码\\elastic_parent\\lucene_op\\index")));

        // 2. 构建索引查询器
        IndexSearcher indexSearcher = new IndexSearcher(indexReader);

        // 3. 执行查询，获取文档
        QueryParser queryParser = new QueryParser("content", new IKAnalyzer());

        TopDocs topDocs = indexSearcher.search(queryParser.parse("人生是一条河"), 50);
        ScoreDoc[] scoreDocArrary = topDocs.scoreDocs;

        // 4. 遍历打印文档
        for (ScoreDoc scoreDoc : scoreDocArrary) {
            int docId = scoreDoc.doc;
            Document document = indexSearcher.doc(docId);

            System.out.println("文件名:" + document.get("file_name") + " 路径：" + document.get("path"));
        }

        indexReader.close();

    }

}
