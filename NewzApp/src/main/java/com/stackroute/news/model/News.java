package com.stackroute.news.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class News {
    private Integer newsId;
    private String title;
    private String description;
    private String publishedAt;
    private String content;
    private String url;
    private String urlToImage;
}
