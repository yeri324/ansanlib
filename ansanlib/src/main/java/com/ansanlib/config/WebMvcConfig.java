package com.ansanlib.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.util.UrlPathHelper;

@Configuration // 스프링 빈으로 등록
public class WebMvcConfig implements WebMvcConfigurer {
	private final long MAX_AGE_SECS = 3600;

	@Value("${uploadPath}") 
	String uploadPath;

	 
	@Override
	public void addCorsMappings(CorsRegistry registry) { // 모든 경로에 대하여
		registry.addMapping("/**") // Origin이 http:localhost:3000에 대해.
				.allowedOrigins("http://localhost:3000") // GET, POST, PUT, PATCH, DELETE, OPTIONS 메서드를 허용한다.
				.allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS").allowedHeaders("*")
				.allowCredentials(true).maxAge(MAX_AGE_SECS);
	}
	
	 @Override
	    public void addResourceHandlers(ResourceHandlerRegistry registry) {
	        registry.addResourceHandler("/faq/new")
	                .addResourceLocations(uploadPath);
	    }

	
}