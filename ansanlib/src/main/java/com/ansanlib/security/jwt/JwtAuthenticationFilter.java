package com.ansanlib.security.jwt;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ansanlib.security.user.CustomUser;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    // 생성자
    public JwtAuthenticationFilter( AuthenticationManager authenticationManager,  JwtTokenProvider jwtTokenProvider ) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        //필터 URL 경로 설정
        setFilterProcessesUrl(JwtConstants.AUTH_LOGIN_URL);
    }

  
    //인증 시도 메소드
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        
        String loginid = request.getParameter("loginid");
        String password = request.getParameter("password");

        // 사용자 인증정보 객체 생성
        Authentication authentication = new UsernamePasswordAuthenticationToken(loginid, password);

        // 사용자 인증 (로그인)
        authentication = authenticationManager.authenticate(authentication);

        // 인증 실패
        if( !authentication.isAuthenticated()) response.setStatus(401);

   
        return authentication;
    }


    // 인증 성공 메소드
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authentication) throws IOException, ServletException {

        CustomUser user = ((CustomUser) authentication.getPrincipal());
        Long userid = user.getUser().getUserId();
        String loginid = user.getUser().getLoginid();

        List<String> roles = user.getAuthorities()
                                .stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList());

        // JWT
        String token = jwtTokenProvider.createToken(userid, loginid, roles);

        // Authorization : Bearer + {jwt} 
        response.addHeader(JwtConstants.TOKEN_HEADER, JwtConstants.TOKEN_PREFIX + token);
        response.setStatus(200);
    }

    
}
