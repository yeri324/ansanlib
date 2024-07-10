package com.ansanlib.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ansanlib.security.jwt.JwtAuthenticationFilter;
import com.ansanlib.security.jwt.JwtRequestFilter;
import com.ansanlib.security.jwt.JwtTokenProvider;
import com.ansanlib.security.user.CustomUserDetailsService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
//@preAuthorize @postAuthorize @Secured 활성화
@EnableMethodSecurity(prePostEnabled = true,securedEnabled = true) 
public class SecurityConfig {

	private final CustomUserDetailsService customUserDetailsService;
    private final JwtTokenProvider jwtTokenProvider;
    private AuthenticationManager authenticationManager;


    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(customUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(provider);
    }

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		// // 폼 기반 로그인 비활성화
		http.formLogin(login -> login.disable());

		// // HTTP 기본 인증 비활성화
		http.httpBasic(basic -> basic.disable());

		// CSRF(Cross-Site Request Forgery) 공격 방어 기능 비활성화
		http.csrf(csrf -> csrf.disable());

        // 필터 설정
        http.addFilterAt(new JwtAuthenticationFilter(authenticationManager(), jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(new JwtRequestFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
            ;

        http.authorizeHttpRequests( authorizeRequests ->
                                        authorizeRequests
//                                            .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
//                                            .requestMatchers("/").permitAll()
//                                            .requestMatchers("/login").permitAll()
//                                            .requestMatchers("/users/**").permitAll()
//                                            .requestMatchers("/faq/**").permitAll()
//                                        	  .requestMatchers("/notice/**").permitAll()
//                                            .requestMatchers("/admin/**").hasRole("ADMIN")
                                            .anyRequest().permitAll())
//                                            .anyRequest().authenticated() )
                                            ;
									

		return http.build();
	}
	
	 @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }
	 
	
	 

}