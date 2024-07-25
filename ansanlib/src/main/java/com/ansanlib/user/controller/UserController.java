package com.ansanlib.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	        try {
	            System.out.println("***");
	            //토큰에서 가져온 사용자 정보(일부만 사용가능)
	            LibUser tokenUser = customUser.getUser();
	            
	            //db에서 가져온 전체 사용자 정보
	            LibUser user = userService.select(tokenUser.getUserId());

	            // 인증된 사용자 정보
	            if (user != null) {
	                // LibUser 객체를 UserDto 객체로 변환하여 반환
	                UserDto userDto = new UserDto();
	                userDto.setName(user.getName());
	                userDto.setEmail(user.getEmail());
	                userDto.setLoginid(user.getLoginid());
	                userDto.setUserId(user.getUserId());
	                // 패스워드는 포함하지 않음
	                userDto.setPhone(user.getPhone());
	                userDto.setAddress(user.getAddress());
	                userDto.setAddress2(user.getAddress2());
	                userDto.setGender(user.getGender().toString());
	                userDto.setRole(user.getRole());
	                userDto.setSms(user.getSms());
	                userDto.setJoinDate(user.getJoinDate());
	                userDto.setRegTime(user.getRegTime());
	                userDto.setLoginDate(user.getLoginDate());

	                return new ResponseEntity<>(userDto, HttpStatus.OK);
	            }

	            // 인증 되지 않음
	            return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);

	        } catch (Exception e) {
	            e.printStackTrace();
	            return new ResponseEntity<>("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	// 회원가입
	@PostMapping("")
	public ResponseEntity<?> join(@RequestBody UserDto user) throws Exception {
		return userService.join(user);
	}

    // 회원탈퇴
    @Secured("ROLE_USER")          //  USER 권한 설정
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> destroy(@AuthenticationPrincipal CustomUser user){
       if(user == null) {
    	   return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Logged in.");
       }
       long userId = user.getUser().getUserId();
       try {
    	   System.out.println("Deleting user");
    	   userService.deleteUser(userId);
    	   return ResponseEntity.ok("회원탈퇴가 성공적으로 처리되었습니다.");
       } catch (Exception e) {
    	   e.printStackTrace();
    	   return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 탈퇴 중 오류가 발생했습니다.");
       }
    }
	
	// 중복 아이디 체크
	@PostMapping("/check/loginid")
	public ResponseEntity<?> checkId(@RequestBody UserDto user) throws Exception {
		return userService.checkId(user.getLoginid());
	}
	
	// 중복 이메일 체크
	@PostMapping("/check/email")
	public ResponseEntity<?> checkEmail(@RequestBody UserDto user) throws Exception {
		return userService.checkEmail(user.getEmail());
	}

	// 아이디 찾기
	@PostMapping("/findId")
	public ResponseEntity<?> findIdByEmail(@RequestBody UserDto userDto) throws Exception {
		return userService.findIdByEmailAndName(userDto.getEmail(), userDto.getName());
	}
	
	// 비밀번호 찾기
	@PostMapping("/findPw")
	public ResponseEntity<?> findPwSendEmail(@RequestBody UserDto userDto) throws Exception {
		return userService.resetPassword(userDto.getLoginid(), userDto.getEmail());
	}

	
	@PutMapping()
    public ResponseEntity<String> updateUser(@AuthenticationPrincipal CustomUser user, @RequestBody UserDto userDto){
		if(user == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Logged in.");
		}
		long userId = user.getUser().getUserId();
        try {
            System.out.println("Updating user with ID : "+ userId);
            userService.updateUser(userId, userDto);
            return ResponseEntity.ok("회원 정보가 성공적으로 업데이트 되었습니다.");
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 정보 업데이트 중 오류가 발생했습니다.");
        }
    }
}
