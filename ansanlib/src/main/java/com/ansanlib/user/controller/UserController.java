package com.ansanlib.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.user.dto.UserDto;
import com.ansanlib.user.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

	   private final UserService userService;

	    @PostMapping("/user/join")
	    public ResponseEntity<String> join(@RequestBody UserDto userDto) {
	        return userService.join(userDto);
	    }
	

	@GetMapping("user/checkId")
	public ResponseEntity<String> checkId(@RequestParam("loginid") String loginid) {
		
		
		return userService.checkId(loginid);
	}
	
	
//	 //아이디 찾기
//	@PostMapping("/user/findId")
//	public ResponseEntity<String> findId(@RequestBody Map<String, String> request) {
//	    String email = request.get("email");
//	    String name = request.get("name");
//	    String foundId;
//
//	    if (email != null) {
//	        foundId = userService.findIdByEmail(email);
//	        if (foundId != null) {
//	            return ResponseEntity.ok(foundId);
//	        } else {
//	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("아이디를 찾을 수 없습니다.");
//	        }
//	    } else {
//	        return ResponseEntity.badRequest().body("이메일이 필요합니다.");
//	    }
//	}

	
}
