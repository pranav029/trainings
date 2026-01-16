package com.cgi.assignment.controller;

import com.cgi.assignment.dto.ResponseDto;
import com.cgi.assignment.entities.User;
import com.cgi.assignment.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/jwt/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<ResponseDto<User>> createUser(@RequestBody User user) {
        ResponseDto<User> responseDto = userService.createUser(user);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }
}
