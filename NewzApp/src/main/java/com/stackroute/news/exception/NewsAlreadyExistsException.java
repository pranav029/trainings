package com.stackroute.news.exception;

public class NewsAlreadyExistsException extends RuntimeException {
    public NewsAlreadyExistsException(String resourceName, String resourceField, String value) {
        super(String.format("%s with %s:%s already exits", resourceName, resourceField, value));
    }
}
