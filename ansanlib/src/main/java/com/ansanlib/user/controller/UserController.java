package com.ansanlib.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.entity.LibUser;
import com.ansanlib.user.dto.UserDto;
import com.ansanlib.user.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
	  private final UserService userService;
	  
	  private final PasswordEncoder passwordEncoder;
	  
	  // 로그인
	    @PostMapping("/user/login")
	    public ResponseEntity<LibUser> login(@RequestBody UserDto request, HttpServletRequest httpRequest) {
	        String loginid = request.getLoginid();
	        String password = request.getPassword();

	        System.out.println("로그인 요청: 아이디 = " + loginid + ", 비밀번호 = " + password);

	        LibUser authenticatedUser = userService.authenticate(loginid, password);
	        if (authenticatedUser != null) {
	            // 로그인 성공 시 세션에 userId 설정
	            httpRequest.getSession().setAttribute("userId", authenticatedUser.getUserId());
	            return ResponseEntity.ok(authenticatedUser); // 회원 인증 성공 시 회원 정보 반환
	        } else {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // 인증 실패 시 UNAUTHORIZED 반환
	        }
	    }
}
