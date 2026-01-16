package com.cgi.assignment.entities;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer newsId;
    private String newsTitle;
    private String newsDescription;
    private String newsDate;
}
