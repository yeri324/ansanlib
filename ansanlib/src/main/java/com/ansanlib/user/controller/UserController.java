package com.ansanlib.user.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.user.dto.UserDto;
import com.ansanlib.user.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

	// private final PasswordEncoder passwordEncoder;

	@Autowired
	private UserService userService;

	
	
	//가입가입
	@PostMapping("/user/join")
	public ResponseEntity<String> join(@RequestBody UserDto userDto) {
		System.out.println("가입완뇨~");
		try {
			userService.join(userDto);
			return new ResponseEntity<>("회원가입이 완료되었습니다.", HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>("회원가입 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	
	//아이디 중복체쿠
	@GetMapping("user/checkId")
	public ResponseEntity<String> checkId(@RequestParam("loginid") String loginid) {
		return userService.checkId(loginid);
	}

	// 아이디 찾기
	@PostMapping("/user/findId")
	public ResponseEntity<String> findId(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		String name = request.get("name");
		String foundId;

		if (email != null) {
			foundId = userService.findIdByEmail(email);
			if (foundId != null) {
				return ResponseEntity.ok(foundId);
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("아이디를 찾을 수 없습니다.");
			}
		} else {
			return ResponseEntity.badRequest().body("이메일이 필요합니다.");
		}
	}

	
//	//비번찾기
//	@PostMapping("/user/findPw")
//	public ResponseEntity<String> findPw(@RequestBody UserDto userDto) {
//		try {
//			String foundPw = userService.findPw(userDto);
//			
//			if(foundPw != null) {
//			      return ResponseEntity.ok("임시 비밀번호가 이메일로 전송되었습니다.");
//            } else {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("존재하지 않는 회원이거나 잘못 입력된 정보입니다.");
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
//        }
//    }
}