package com.example.AnimalWelfare.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Apply CORS to all endpoints
                .allowedOrigins("http://127.0.0.1:5500", "http://localhost:3000") // Replace with your allowed origins
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Specify HTTP methods allowed
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow cookies or credentials
    }
}