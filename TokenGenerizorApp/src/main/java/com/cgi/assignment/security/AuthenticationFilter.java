package com.cgi.assignment.security;

import com.cgi.assignment.dto.ResponseDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.rmi.RemoteException;
import java.security.Key;
import java.security.SignatureException;
import java.util.Arrays;

import static com.cgi.assignment.security.JwtTokenManager.SECRET_KEY;


public class AuthenticationFilter extends GenericFilter {

    private final JwtTokenManager jwtTokenManager = new JwtTokenManager();

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;
        System.out.println(Arrays.toString(httpRequest.getCookies()));
        String token = httpRequest.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer"))
            sendErrorResponse(httpResponse);
        else {
            String jwtToken = token.substring(7);
            String email = jwtTokenManager.getEmailFromToken(jwtToken);
            if (jwtTokenManager.validateToken(jwtToken, email)){
                servletRequest.setAttribute(email, email);
                filterChain.doFilter(servletRequest, servletResponse);
            }
            else sendErrorResponse(httpResponse);
        }


    }

    private void sendErrorResponse(HttpServletResponse response) throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.getWriter().write(convertObjectToJson(new ResponseDto<Void>(false, null, null, "Invalid jwt token")));
    }

    private String convertObjectToJson(Object object) throws JsonProcessingException {
        if (object == null) {
            return null;
        }
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(object);
    }
}
