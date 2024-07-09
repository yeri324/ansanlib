package com.ansanlib.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.entity.LibUser;
import com.ansanlib.security.user.CustomUser;
import com.ansanlib.user.dto.UserDto;
import com.ansanlib.user.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	// 유저 정보 조회
	@GetMapping("/info")
	public ResponseEntity<?> userInfo(@AuthenticationPrincipal CustomUser customUser) {
		LibUser user = customUser.getUser();

		// 인증된 사용자 정보
		if (user != null)
			return new ResponseEntity<>(user, HttpStatus.OK);

		// 인증 되지 않음
		return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
	}

	// 회원가입
	@PostMapping("")
	public ResponseEntity<?> join(@RequestBody UserDto user) throws Exception {
		return userService.join(user);
	}

    // 회원탈퇴
    @Secured("ROLE_USER")          //  USER 권한 설정
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> destroy(@PathVariable("userId") Long userId) throws Exception {
        return userService.delete(userId);
    }
	
	//중복 아이디 체크
	@PostMapping("/check/loginid")
	public ResponseEntity<?> checkId(@RequestBody UserDto user) throws Exception {
		return userService.checkId(user.getLoginid());
	}
	//중복 이메일 체크
	@PostMapping("/check/email")
	public ResponseEntity<?> checkEmail(@RequestBody UserDto user) throws Exception {
		return userService.checkEmail(user.getEmail());
	}

}
