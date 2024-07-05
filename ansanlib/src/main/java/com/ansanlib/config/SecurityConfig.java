package com.ansanlib.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.ansanlib.user.service.UserService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final UserService userService;

	private final PasswordEncoderConfig passwordEncoderConfig;
	
	 @Bean
	    public AuthenticationProvider authenticationProvider() {
	        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
	        provider.setUserDetailsService(userService);
	        provider.setPasswordEncoder(passwordEncoderConfig.passwordEncoder());
	        return provider;
	    }

	 @Bean
	    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	        http
	        .authenticationProvider(authenticationProvider())
	        		.csrf(csrf -> csrf.disable())
	        		.sessionManagement(sessionManagement -> 
	                	sessionManagement.maximumSessions(1)
	                		.maxSessionsPreventsLogin(false)
	        		)
	                .formLogin(formLogin -> formLogin
	                        .defaultSuccessUrl("/api/user/login")  // 로그인 성공 시 이동할 기본 URL
	                        .failureUrl("/member/login/error")  // 로그인 실패 시 이동할 URL
	                        .permitAll())
	                
	                .logout(logout -> logout
	                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
	                        .logoutSuccessUrl("/")
	                        .invalidateHttpSession(true) // 세션 무효화
	                        .deleteCookies("JSESSIONID")) // 쿠키 삭제

	                .authorizeHttpRequests(request -> request
//	                        .requestMatchers(new AntPathRequestMatcher("/member/**")).permitAll()  // 회원 관련 모든 URL 허용
//	                        .requestMatchers(new AntPathRequestMatcher("/teacher/**")).hasAnyRole("ADMIN", "TEACHER")
//	                        .requestMatchers(new AntPathRequestMatcher("/**")).hasRole("ADMIN")  // 관리자 페이지 접근 권한 설정
	                        .requestMatchers(new AntPathRequestMatcher("/api/**")).permitAll()
//	                        .anyRequest().permitAll()
//	                        .requestMatchers(new AntPathRequestMatcher("/**")).permitAll()
	                        .requestMatchers("/**").authenticated());
	             
	        return http.build();
	    }
		

}