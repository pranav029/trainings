package com.stackroute.news.NewzApp;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.news.controller.NewsController;
import com.stackroute.news.dto.ResponseDto;
import com.stackroute.news.model.News;
import com.stackroute.news.model.UserNews;
import com.stackroute.news.service.NewsService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class NewsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private NewsService newsService;
    private UserNews userNews;

    @InjectMocks
    private NewsController newsController;
    private News news;

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

        mockMvc = MockMvcBuilders.standaloneSetup(newsController).build();
    }

    @AfterEach
    void tearDown() {
        userNews = null;
        news = null;
    }

    @Test
    void testCreate() throws Exception {
        when(newsService.createNews(any())).thenReturn(new ResponseDto<>(true, null, userNews, null));
        mockMvc.perform(
                        post("/api/news/create")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonToString(userNews)))
                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
        verify(newsService, times(1)).createNews(any());
    }

    @Test
    void testFetchAll() throws Exception {
        when(newsService.getAllNews()).thenReturn(new ResponseDto<>(true, null, List.of(), null));
        mockMvc.perform(
                get("/api/news/all")
                        .contentType(MediaType.APPLICATION_JSON)
        );
        verify(newsService, times(1)).getAllNews();
    }

    @Test
    void testGetByUserId() throws Exception {
        when(newsService.getAllNewsByUserId(any())).thenReturn(new ResponseDto<>(true, null, userNews, null));
        mockMvc.perform(
                get("/api/news/byUserId/f89709870")
                        .contentType(MediaType.APPLICATION_JSON)
        );
        verify(newsService, times(1)).getAllNewsByUserId(any());
    }

    @Test
    void testDelete() throws Exception {
        when(newsService.deleteNews(any())).thenReturn(any());
        mockMvc.perform(
                delete("/api/news/delete/1")
                        .contentType(MediaType.APPLICATION_JSON)
        );
        verify(newsService,times(1)).deleteNews(any());
    }

    private static String jsonToString(final Object ob) throws JsonProcessingException {
        String result;
        try {
            ObjectMapper mapper = new ObjectMapper();
            String jsonContent = mapper.writeValueAsString(ob);
            result = jsonContent;
        } catch (JsonProcessingException e) {
            result = "JSON processing error";
        }

        return result;
    }

}
