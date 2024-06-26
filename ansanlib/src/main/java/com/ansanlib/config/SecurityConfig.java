//package com.ansanlib.config;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//import com.ansanlib.user.service.UserService;
//
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//
//    @Autowired
//    private UserService userService;
//    
//    //@Autowired
//  //  private PasswordEncoderConfig passwordEncoderConfig;
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//        		.csrf(csrf -> csrf.disable())
//        		.sessionManagement(sessionManagement -> 
//                	sessionManagement.maximumSessions(1)
//                		.expiredUrl("/user/login?expired=true")
//        		)
//                .formLogin(formLogin -> formLogin
//                        .loginPage("http://localhost:3000/login")  // 커스텀 로그인 페이지 설정
//                        .defaultSuccessUrl("/")  // 로그인 성공 시 이동할 기본 URL
//                        .usernameParameter("loginid")  // 로그인 시 사용할 아이디 파라미터명
//                        .passwordParameter("password")  // 로그인 시 사용할 비밀번호 파라미터명
//                        .failureUrl("/user/login/error")  // 로그인 실패 시 이동할 URL
//                        .permitAll());
//                
////                .logout(logout -> logout
////                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
////                        .logoutSuccessUrl("/")
////                        .invalidateHttpSession(true) // 세션 무효화
////                        .deleteCookies("JSESSIONID")) // 쿠키 삭제
////
////                .authorizeHttpRequests(request -> request
////                        .requestMatchers(new AntPathRequestMatcher("/member/**")).permitAll()  // 회원 관련 모든 URL 허용
////                        .requestMatchers(new AntPathRequestMatcher("/teacher/**")).hasAnyRole("ADMIN", "TEACHER")
////                        .requestMatchers(new AntPathRequestMatcher("/manage/**")).hasRole("ADMIN")  // 관리자 페이지 접근 권한 설정
////                        .requestMatchers(new AntPathRequestMatcher("/**")).permitAll()
////                        .requestMatchers("/**").authenticated())
////
////                .exceptionHandling(exceptionHandling -> exceptionHandling
////                        .authenticationEntryPoint(new CustomAuthenticationEntryPoint()));
////
//        return http.build();
//    }
////
////
////    @Bean
////    public AuthenticationProvider authenticationProvider() {
////        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
////        provider.setUserDetailsService(memberService);
////        provider.setPasswordEncoder(passwordEncoderConfig.passwordEncoder());
////        return provider;
////    }
//
//}