package com.cgi.assignment.services.news;

import com.cgi.assignment.dto.ResponseDto;
import com.cgi.assignment.entities.News;
import com.cgi.assignment.repository.NewsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsServiceImpl implements NewsService {
    @Autowired
    private NewsRepo newsRepo;

    @Override
    public ResponseDto<News> createNews(News news) {
        News createdNews = newsRepo.save(news);
        return new ResponseDto<>(true, "News created successfully", createdNews, null);
    }

    @Override
    public ResponseDto<List<News>> getAllNews() {
        List<News> allNews = newsRepo.findAll();
        return new ResponseDto<>(true, null, allNews, null);
    }
}
