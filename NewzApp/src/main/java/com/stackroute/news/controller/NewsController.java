package com.stackroute.news.controller;

import com.stackroute.news.dto.ResponseDto;
import com.stackroute.news.model.News;
import com.stackroute.news.model.UserNews;
import com.stackroute.news.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/news")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @PostMapping("/create")
    public ResponseEntity<ResponseDto<UserNews>> createNews(@RequestBody UserNews userNews) {
        ResponseDto<UserNews> responseDto = newsService.createNews(userNews);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<ResponseDto<Void>> deleteNews(@PathVariable String userId) {
        ResponseDto<Void> responseDto = newsService.deleteNews(userId);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseDto<List<News>>> getAllNews() {
        ResponseDto<List<News>> responseDto = newsService.getAllNews();
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/byUserId/{userId}")
    public ResponseEntity<ResponseDto<UserNews>> getNewsByUserId(@PathVariable String userId) {
        ResponseDto<UserNews> responseDto = newsService.getAllNewsByUserId(userId);
        return ResponseEntity.ok(responseDto);
    }
}
