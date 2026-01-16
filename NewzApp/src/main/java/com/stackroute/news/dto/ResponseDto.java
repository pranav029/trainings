package com.stackroute.news.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDto<T> {
    Boolean success;
    String message;
    T data;
    String error;
}
