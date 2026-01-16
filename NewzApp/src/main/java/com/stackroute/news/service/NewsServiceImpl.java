package com.stackroute.news.service;

import com.stackroute.news.dto.ResponseDto;
import com.stackroute.news.exception.NewsAlreadyExistsException;
import com.stackroute.news.exception.NewsNotFoundException;
import com.stackroute.news.model.News;
import com.stackroute.news.model.UserNews;
import com.stackroute.news.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class NewsServiceImpl implements NewsService {

    @Autowired
    private NewsRepository newsRepository;

    @Override
    public ResponseDto<UserNews> createNews(UserNews userNews) {
        if (userNews.getUserId() != null) {
            if (newsRepository.findByUserId(userNews.getUserId()).isPresent())
                throw new NewsAlreadyExistsException("User", "Id", userNews.getUserId());
        }
        UserNews savedUserNews = newsRepository.save(userNews);
        return new ResponseDto<>(true, "News created successfully", savedUserNews, null);
    }

    @Override
    public ResponseDto<Void> deleteNews(String userId) {
        UserNews userNews = newsRepository.findByUserId(userId).orElseThrow(() -> new NewsNotFoundException("User", "Id", userId));
        newsRepository.delete(userNews);
        return new ResponseDto<>(true, "News deleted successfully", null, null);
    }

    @Override
    public ResponseDto<List<News>> getAllNews() {
        Iterable<UserNews> newsIterable = newsRepository.findAll();
        List<UserNews> userNews = StreamSupport.stream(newsIterable.spliterator(), false).toList();
        ArrayList<News> news = new ArrayList<>();
        userNews.forEach(n -> news.addAll(n.getNewslist()));
        return new ResponseDto<>(true, null, news, null);
    }

    @Override
    public ResponseDto<UserNews> updateNews(UserNews userNews) {
        return null;
    }

    @Override
    public ResponseDto<UserNews> getAllNewsByUserId(String userId) {
        UserNews userNews = newsRepository.findByUserId(userId).orElseThrow(() -> new NewsNotFoundException("User", "Id", userId));
        return new ResponseDto<>(true, null, userNews, null);
    }
}
