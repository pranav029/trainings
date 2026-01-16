package com.assignment.cgi.exceptions;

public class CustomerAlreadyExitsException extends RuntimeException {
    public CustomerAlreadyExitsException(String userId) {
        super(String.format("Customer with id %s already exits", userId));
    }
}
