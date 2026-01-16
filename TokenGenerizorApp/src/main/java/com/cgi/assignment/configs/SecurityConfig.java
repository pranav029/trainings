package com.cgi.assignment.configs;

import com.cgi.assignment.security.AuthenticationFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class SecurityConfig {

    @Bean
    public FilterRegistrationBean<AuthenticationFilter> getFilter() {
        FilterRegistrationBean<AuthenticationFilter> filterReg = new FilterRegistrationBean<>();
        filterReg.setFilter(new AuthenticationFilter());
        filterReg.addUrlPatterns("/api/jwt/news/*");
        return filterReg;
    }


}
