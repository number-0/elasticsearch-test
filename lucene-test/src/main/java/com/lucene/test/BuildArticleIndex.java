package com.lucene.test;

import org.apache.commons.io.FileUtils;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.StoredField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.store.FSDirectory;
import org.wltea.analyzer.lucene.IKAnalyzer;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;

/**
 * 通过这个类来读取文章的文本文件，建立索引
 */
public class BuildArticleIndex {
    public static void main(String[] args) throws IOException {
        // 1. 构建分词器（StandardAnalyzer）
        Analyzer standardAnalyzer = new IKAnalyzer();

        // 2. 构建文档写入器配置（IndexWriterConfig）
        IndexWriterConfig writerConfig = new IndexWriterConfig(standardAnalyzer);

        // 3. 构建文档写入器（IndexWriter，注意：需要使用Paths来）
        IndexWriter indexWriter = new IndexWriter(FSDirectory.open(Paths.get("D:\\课程研发\\51.V8.0_NoSQL_MQ\\3.ElasticStack\\3.代码\\elastic_parent\\lucene_op\\index")), writerConfig);

        // 4. 读取所有文件构建文档
        // 读取data目录中的所有文件
        File dataDir = new File("D:\\课程研发\\51.V8.0_NoSQL_MQ\\3.ElasticStack\\3.代码\\elastic_parent\\lucene_op\\data");
        File[] fileArray = dataDir.listFiles();

        // 迭代所有的文本文件，读取文件并建立索引
        for (File file : fileArray) {
            // 5. 文档中添加字段
            // 字段名	类型	说明
            // file_name	TextFiled	文件名字段，需要在索引文档中保存文件名内容
            // content	TextFiled	内容字段，只需要能被检索，但无需在文档中保存
            // path	StoredFiled	路径字段，无需被检索，只需要在文档中保存即可

            // 在Lucene中都是以Document的形式来存储内容的
            // Lucene在添加文档的时候就会自动建立索引
            Document doc = new Document();
            // 如果需要建立索引，就用TextField，如果不需要就使用StoredField
            doc.add(new TextField("file_name", file.getName(), Field.Store.YES));
            doc.add(new TextField("content", FileUtils.readFileToString(file), Field.Store.NO));
            doc.add(new StoredField("path", file.getAbsolutePath()));

            // 6. 写入文档
            indexWriter.addDocument(doc);
        }

        // 7. 关闭写入器
        indexWriter.close();
    }
}
