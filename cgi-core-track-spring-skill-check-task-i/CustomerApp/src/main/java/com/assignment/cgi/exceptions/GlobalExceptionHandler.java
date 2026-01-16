package com.assignment.cgi.exceptions;

import com.assignment.cgi.dto.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomerAlreadyExitsException.class)
    public ResponseEntity<ResponseDto<Void>> handleAlreadyExitingCustomer(CustomerAlreadyExitsException e) {
        return new ResponseEntity<>(new ResponseDto<>(false, null, null, e.getMessage()), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ResponseDto<Void>> handleResourceNotFoundException(ResourceNotFoundException e) {
        return new ResponseEntity<>(new ResponseDto<>(false, null, null, e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseDto<Map<String, String>>> handleInvalidArguments(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            errors.put(fieldName, message);
        });
        return new ResponseEntity<>(new ResponseDto<>(false, null, errors, "Fields not valid"), HttpStatus.NOT_FOUND);
    }
}
