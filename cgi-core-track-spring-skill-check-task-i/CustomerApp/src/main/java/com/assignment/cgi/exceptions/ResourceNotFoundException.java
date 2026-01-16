package com.assignment.cgi.exceptions;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String resourceName, String resourceField, String value) {
        super(String.format("%s not found with %s : %s", resourceName, resourceField, value));
    }
}
