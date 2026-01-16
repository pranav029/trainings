package com.stackroute.news.NewzApp;

import com.stackroute.news.model.News;
import com.stackroute.news.model.UserNews;
import com.stackroute.news.repository.NewsRepository;
import com.stackroute.news.utils.DateTimeUtils;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.test.util.AssertionErrors.*;

@ExtendWith(SpringExtension.class)
@DataMongoTest
public class MongoTest {
    @Autowired
    private NewsRepository newsRepository;
    private News news;
    private UserNews userNews;

    @BeforeEach
    void setUp() {
        news = new News();
        news.setUrl("test_url");
        news.setContent("test_content");
        news.setTitle("test_title");
        news.setUrlToImage("test_urlToImage");
        news.setPublishedAt("test_date");
        news.setDescription("test_description");

        userNews = new UserNews();
        userNews.setNewslist(new ArrayList<>(List.of(news)));
    }

    @AfterEach
    void tearDown() {
        news = null;
        userNews = null;
    }

    @Test
    @DisplayName("test for creating note")
    void addNote() {
        UserNews savedNews = newsRepository.save(userNews);
        Optional<UserNews> getNews = newsRepository.findByUserId(savedNews.getUserId());
        assertNotNull("Response news is null", getNews);
        assertEquals(null, news, getNews.get().getNewslist().get(0));
    }


    @Test
    @DisplayName("test for deleting note")
    void deleteNote() {
        UserNews savedNews = newsRepository.save(userNews);
        newsRepository.delete(savedNews);
        Optional<UserNews> getNews = newsRepository.findByUserId(savedNews.getUserId());
        assertFalse(null, getNews.isPresent());
    }

    @Test
    @DisplayName("test for getting all news")
    void getAllUserNews() {
        List<UserNews> userNews1 = newsRepository.findAll();
        assertNotNull("Response is null", userNews1);
        assertTrue("Response list is  empty", userNews1.size() > 0);
    }
}
