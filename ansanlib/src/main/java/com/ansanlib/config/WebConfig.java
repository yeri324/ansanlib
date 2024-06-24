package com.ansanlib.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // CORS를 적용할 URL 패턴 지정
                .allowedOrigins("*") // 모든 도메인 허용 (실제 배포 시 필요에 따라 수정)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메소드
                .allowedHeaders("Origin", "Content-Type", "Accept", "Authorization") // 허용할 HTTP 헤더
                .allowCredentials(true) // 클라이언트에서 쿠키를 주고받을 수 있도록 설정
                .maxAge(3600); // preflight 요청의 캐시 시간 설정
    }
}
