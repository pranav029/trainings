package com.cgi.assignment.services.user;

import com.cgi.assignment.dto.ResponseDto;
import com.cgi.assignment.entities.User;
import com.cgi.assignment.repository.UserRepo;
import com.cgi.assignment.security.JwtTokenManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.AbstractMap;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtTokenManager jwtTokenManager;

    @Override
    public ResponseDto<Map<String, String>> login(User user) {
        Optional<User> fetchedUser = userRepo.findByEmailAndPassword(user.getEmail(),user.getPassword());
        if (fetchedUser.isEmpty()) return new ResponseDto<>(false, null, null, "User not found");
        String token = jwtTokenManager.generateToken(fetchedUser.get());
        return new ResponseDto<>(true, "token generate success", Map.of("token", token), null);
    }

    @Override
    public ResponseDto<User> createUser(User user) {
        User createdUser = userRepo.save(user);
        return new ResponseDto<>(true, "User created successfully", createdUser, null);
    }
}
