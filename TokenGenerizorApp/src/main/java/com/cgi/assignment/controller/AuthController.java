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

import java.util.Map;

@RestController
@RequestMapping("api/jwt/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<ResponseDto<Map<String, String>>> login(@RequestBody User user) {
        ResponseDto<Map<String, String>> responseDto = userService.login(user);
        if (responseDto.getData() == null) return new ResponseEntity<>(responseDto, HttpStatus.UNAUTHORIZED);
        return ResponseEntity.ok(responseDto);
    }
}
