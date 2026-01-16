package com.cgi.assignment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDto<T> {
    private boolean success;
    private String message;
    private T data;
    private String error;
}
