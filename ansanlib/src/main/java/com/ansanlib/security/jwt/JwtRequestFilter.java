package com.ansanlib.security.jwt;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {
   
    private final JwtTokenProvider jwtTokenProvider;
    
        
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
    	// HTTP 헤더에서 토큰을 가져옴
        String header = request.getHeader(JwtConstants.TOKEN_HEADER);
        
        // Bearer + {jwt} 체크
        if (header == null || header.length() == 0 || !header.startsWith(JwtConstants.TOKEN_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        // "Bearer " 제거
        String jwt = header.replace(JwtConstants.TOKEN_PREFIX, "");
        
        
        // 토큰을 사용하여 Authentication 객체 생성
        Authentication authentication = jwtTokenProvider.getAuthentication(jwt);

        // 토큰 유효 검사 (토큰이 만료되지 않았으면)
        if( jwtTokenProvider.validateToken(jwt) ) {
            System.out.println("유효한 JWT 토큰입니다.");
            //로그인
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        
        // 다음 필터로 진행
        filterChain.doFilter(request, response);
    }
}
