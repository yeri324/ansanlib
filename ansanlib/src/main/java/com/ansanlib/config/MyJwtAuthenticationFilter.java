//package com.ansanlib.config;
//
//import java.io.IOException;
//
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//
//public class MyJwtAuthenticationFilter extends OncePerRequestFilter {
//
//    private final String secretKey = "your_secret_key";
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//        String authorizationHeader = request.getHeader("Authorization");
//
//        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
//            String jwt = authorizationHeader.substring(7);
//            Claims claims = Jwts.parser()
//                    .setSigningKey(secretKey)
//                    .parseClaimsJws(jwt)
//                    .getBody();
//
//            if (claims != null) {
//                // Set authentication to the security context
//                // You should create and set an authentication token here
//                SecurityContextHolder.getContext().setAuthentication(null);
//            }
//        }
//
//        filterChain.doFilter(request, response);
//    }
//}