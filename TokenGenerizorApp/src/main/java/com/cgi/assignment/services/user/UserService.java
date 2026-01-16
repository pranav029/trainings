package com.cgi.assignment.services.user;

import com.cgi.assignment.dto.ResponseDto;
import com.cgi.assignment.entities.User;

import java.util.Map;

public interface UserService {
    ResponseDto<User> createUser(User user);
    ResponseDto<Map<String,String>> login(User user);
}
