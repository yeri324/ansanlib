package com.ansanlib.security.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
@ConfigurationProperties("com.ansan.jwt")     
public class JwtProps {
    
    private String secretKey;
    

}