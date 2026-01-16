package com.cgi.assignment.controller;

import com.cgi.assignment.dto.ResponseDto;
import com.cgi.assignment.entities.News;
import com.cgi.assignment.services.news.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/jwt/news")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @PostMapping("/create")
    public ResponseEntity<ResponseDto<News>> createNews(@RequestBody News news) {
        ResponseDto<News> responseDto = newsService.createNews(news);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseDto<List<News>>> getAllNews() {
        ResponseDto<List<News>> responseDto = newsService.getAllNews();
        return ResponseEntity.ok(responseDto);
    }
}
