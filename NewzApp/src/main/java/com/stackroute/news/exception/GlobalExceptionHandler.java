package com.stackroute.news.exception;

import com.stackroute.news.dto.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NewsNotFoundException.class)
    public ResponseEntity<ResponseDto<Void>> handleNotFound(NewsNotFoundException e) {
        return new ResponseEntity<>(new ResponseDto<>(false, null, null, e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NewsAlreadyExistsException.class)
    public ResponseEntity<ResponseDto<Void>> handleAlreadyExits(NewsAlreadyExistsException e) {
        return new ResponseEntity<>(new ResponseDto<>(false, null, null, e.getMessage()), HttpStatus.NOT_FOUND);
    }
}
