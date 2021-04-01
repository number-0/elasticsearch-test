package com.elasticsearch.test.service;

import com.elasticsearch.test.entity.JobDetail;
import com.elasticsearch.test.service.impl.JobFullTextServiceImpl;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class JobFullTextServiceTest {

    private JobFullTextService jobFullTextService;

    @BeforeTest
    public void beforeTest() {
        jobFullTextService = new JobFullTextServiceImpl();
    }

    @Test
    public void addTest() throws IOException {
        JobDetail jobDetail = new JobDetail();
        jobDetail.setId(1);
        jobDetail.setArea("江苏省-南京市");
        jobDetail.setCmp("Elasticsearch大学");
        jobDetail.setEdu("本科及以上");
        jobDetail.setExp("一年工作经验");
        jobDetail.setTitle("大数据工程师");
        jobDetail.setJob_type("全职");
        jobDetail.setPv("1700次浏览");
        jobDetail.setJd("会Hadoop就行");
        jobDetail.setSalary("5-9千/月");

        jobFullTextService.add(jobDetail);
    }

    @Test
    public void getTest() throws IOException {
        System.out.println(jobFullTextService.findById(1));
    }

    @Test
    public void updateTest() throws IOException {
        JobDetail jobDetail = jobFullTextService.findById(1);
        jobDetail.setTitle("大数据巨牛开发工程师");
        jobDetail.setSalary("10W飘20W/月");

        jobFullTextService.update(jobDetail);
    }

    @Test
    public void deleteTest() throws IOException {
        jobFullTextService.deleteById(1);
    }

    @Test
    public void searchTest() throws IOException {
        List<JobDetail> jobDetailList = jobFullTextService.searchByKeywords("flink");
        for (JobDetail jobDetail : jobDetailList) {
            System.out.println(jobDetail);
        }
    }

    @Test
    public void searchByPageTest() throws IOException {
        Map<String, Object> resultMap = jobFullTextService.searchByPage("hbase", 1, 3);
        System.out.println("一共查询到:" + resultMap.get("total").toString());

        ArrayList<JobDetail> content = (ArrayList<JobDetail>)resultMap.get("content");
        for (JobDetail jobDetail : content) {
            System.out.println(jobDetail);
        }
    }

    @Test
    public void searchByScrollPageTest1() throws IOException {
        Map<String, Object> resultMap = jobFullTextService.searchByScrollPage("spark", null, 10);
        System.out.println("scroll_id:" + resultMap.get("scroll_id").toString());

        ArrayList<JobDetail> content = (ArrayList<JobDetail>)resultMap.get("content");
        for (JobDetail jobDetail : content) {
            System.out.println(jobDetail);
        }
    }

    @Test
    public void searchByScrollPageTest2() throws IOException {
        Map<String, Object> resultMap = jobFullTextService.searchByScrollPage("spark", "DXF1ZXJ5QW5kRmV0Y2gBAAAAAAAAAA0WZnFzaHFzaXZSQ0d2YW1UeGxBRC05dw==", 10);
        System.out.println("scroll_id:" + resultMap.get("scroll_id").toString());

        ArrayList<JobDetail> content = (ArrayList<JobDetail>)resultMap.get("content");
        for (JobDetail jobDetail : content) {
            System.out.println(jobDetail);
        }
    }

    @AfterTest
    public void afterTest() throws IOException {
        jobFullTextService.close();
    }
}
