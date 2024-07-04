package com.ansanlib.user.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.entity.LibUser;
import com.ansanlib.user.dto.UserDto;
import com.ansanlib.user.repository.UserRepository;
import com.ansanlib.user.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class UserController {

	   @Autowired
	    private UserService userService;

	    @Autowired // PasswordEncoder를 주입받습니다.
	    private PasswordEncoder passwordEncoder;
	    
	    @Autowired
	    private UserRepository userRepository;

	// 아이디 중복체쿠
	@GetMapping("/user/checkId")
	public ResponseEntity<String> checkId(@RequestParam(value="loginid") String loginid) {
		System.out.println(loginid);
		return userService.checkId(loginid);
	}


	 
	// 가입가입
		@PostMapping("/user/join")
		public ResponseEntity<String> join(@RequestBody UserDto userDto) {
			try {
				userService.join(userDto);
				return new ResponseEntity<>("회원가입이 완료되었습니다.", HttpStatus.CREATED);
			} catch (Exception e) {
				return new ResponseEntity<>("회원가입 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

	//  로그인
    @PostMapping("/user/login")
    public ResponseEntity<LibUser> login(@RequestBody Map<String, String> request, HttpServletRequest httpRequest) {
        String loginid = request.get("loginid");
        String password = request.get("password");

        System.out.println("로그인 요청: 아이디 = " + loginid + ", 비밀번호 = " + password);
        
        LibUser authenticatedUser = userService.authenticate(loginid, password);

        if (authenticatedUser != null) {
        httpRequest.getSession().setAttribute("userId", authenticatedUser.getUserId());
            return ResponseEntity.ok(authenticatedUser); // 회원인증 시 정보 반환
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }


	
	// 아이디 찾기
	@PostMapping("/user/findId")
	public ResponseEntity<String> findId(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		String name = request.get("name");
		


		  if (email != null && name != null) {
	            String foundId = userService.findIdByEmailAndName(email, name);
	            if (foundId != null) {
	                return ResponseEntity.ok(foundId);
	            } else {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("아이디를 찾을 수 없습니다.");
	            }
	        } else {
	            return ResponseEntity.badRequest().body("이메일과 이름이 필요합니다.");
	        }
	    }

	//비번찾기
	@PostMapping("/user/findPw")
	public ResponseEntity<String> findPw(@RequestBody UserDto userDto) {
		
		
		try {
			String foundPw = userService.findPw(userDto);
			
			if(foundPw != null) {
				
			      return ResponseEntity.ok("임시 비밀번호가 이메일로 전송되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("존재하지 않는 회원이거나 잘못 입력된 정보입니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
        }
    }
	
	//회원 정보 불러오기
	@GetMapping("/user/myinfo")
	public ResponseEntity<UserDto> getMyInfo(HttpServletRequest httpRequest){
		Long userId =(Long) httpRequest.getSession().getAttribute("userId");
		if (userId == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
		
		Optional<LibUser> userOptional = userRepository.findById(userId);
		if(userOptional.isPresent()) {
			LibUser libUser = userOptional.get();
			UserDto userDto = new UserDto();
			//필요한 필드만 설정하여 반환
			userDto.setLoginid(libUser.getLoginid());
			userDto.setName(libUser.getName());
			userDto.setEmail(libUser.getEmail());
			userDto.setAddress(libUser.getAddress());
			userDto.setAddress2(libUser.getAddress2());
			userDto.setPhone(libUser.getPhone());
			userDto.setSms(libUser.getSms());
			return ResponseEntity.ok(userDto);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
	
	
	//정보수정
	@PostMapping("/user/update")
	public ResponseEntity<String> updateUser(@RequestBody UserDto userDto, HttpServletRequest httpRequest){
		Long userId  = (Long) httpRequest.getSession().getAttribute("userId");
		if (userId == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
		}
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