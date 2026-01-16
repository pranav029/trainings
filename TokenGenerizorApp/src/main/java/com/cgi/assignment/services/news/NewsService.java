package com.cgi.assignment.services.news;

import com.cgi.assignment.dto.ResponseDto;
import com.cgi.assignment.entities.News;

import java.util.List;

public interface NewsService {
    ResponseDto<News> createNews(News news);

    ResponseDto<List<News>> getAllNews();
}
