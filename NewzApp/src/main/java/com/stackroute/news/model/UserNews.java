package com.stackroute.news.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document
@Data
public class UserNews {
    @Id
    private String userId;
    private ArrayList<News> newslist;
}
