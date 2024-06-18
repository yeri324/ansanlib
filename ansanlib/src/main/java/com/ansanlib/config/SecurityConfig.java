package com.ansanlib.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.ansanlib.service.user.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	UserService userService;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.formLogin(formLogin -> formLogin.loginPage("/users/login") // 로그인 페이지 url을 설정
				.defaultSuccessUrl("/") // 로그인 성공 시 이동할 url
				.usernameParameter("loginid") // 로그인 시 사용할 파라미터 이름으로 login을 지정
				.failureUrl("/users/login/error")) // 로그인 실패 시 이동할 url을 설정
				.logout(logout -> logout.logoutRequestMatcher(new AntPathRequestMatcher("/users/logout")) // 로그아웃 url을
																											// 설정
						.logoutSuccessUrl("/"))

				.authorizeHttpRequests(
						request -> request.requestMatchers("/", "/users/**", "/item/**", "/images/**").permitAll() 
																												
								.requestMatchers("/admin/**").hasRole("ADMIN") 
								.anyRequest().authenticated())

				.exceptionHandling(handling -> handling.authenticationEntryPoint(new CustomAuthenticationEntryPoint()));

		return http.build();
	}

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.ignoring().requestMatchers("/css/**", "/js/**", "/img/**");
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(userService);
		provider.setPasswordEncoder(passwordEncoder());
		return provider;
	}

	
}
