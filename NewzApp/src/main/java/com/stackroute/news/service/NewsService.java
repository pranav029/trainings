package com.stackroute.news.service;

import com.stackroute.news.dto.ResponseDto;
import com.stackroute.news.model.News;
import com.stackroute.news.model.UserNews;

import java.util.List;

public interface NewsService {
    ResponseDto<UserNews> createNews(UserNews userNews);

    ResponseDto<Void> deleteNews(String userId);

    ResponseDto<List<News>> getAllNews();

    ResponseDto<UserNews> getAllNewsByUserId(String userId);

    ResponseDto<UserNews> updateNews(UserNews userNews);
}
