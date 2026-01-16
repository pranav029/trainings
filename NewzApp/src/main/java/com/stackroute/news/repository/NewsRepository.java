package com.stackroute.news.repository;

import com.stackroute.news.model.UserNews;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NewsRepository extends MongoRepository<UserNews, String> {
    Optional<UserNews> findByUserId(String userId);
}
