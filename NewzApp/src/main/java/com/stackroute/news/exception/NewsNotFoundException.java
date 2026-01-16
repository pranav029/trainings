package com.stackroute.news.exception;

public class NewsNotFoundException extends RuntimeException {
    public NewsNotFoundException(String resourceName, String resourceField, String value) {
        super(String.format("%s not found with %s: %s", resourceName, resourceField, value));
    }
}
