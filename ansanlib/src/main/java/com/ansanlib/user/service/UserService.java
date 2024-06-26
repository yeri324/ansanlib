package com.ansanlib.user.service;

import java.security.SecureRandom;
import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.entity.LibUser;
import com.ansanlib.user.dto.UserDto;
import com.ansanlib.user.repository.UserRepository;

@Service

public class UserService {

	private final UserRepository userRepository;
	//private final PasswordEncoder passwordEncoder;
	//private final JavaMailSender mailSender;

	
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	
	}

	// checkId 중복검사
	public ResponseEntity<String> checkId(String loginid) {
		if (loginid.length() < 5) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("아이디는 5글자 이상만 가능합니다.");
		}

		if (!Pattern.matches("[a-zA-Z0-9]+", loginid)) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("아이디는 영문과 숫자만 가능합니다.");
		}

		Optional<LibUser> user = userRepository.findByLoginid(loginid);
		if (user.isPresent()) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 아이디 입니다.");
		} else {
			return ResponseEntity.ok("사용 가능한 아이디 입니다.");
		}
	}

	// 비밀번호 일치 확인 메서드
	public boolean isPasswordMatch(String password, String password2) {
		return password.equals(password2);

	}

	
	//횐가입
	   @Transactional(rollbackFor = Exception.class)
	public ResponseEntity<String> join(UserDto userDto) {
		// 비밀번호 일치 여부 확인

		if (!isPasswordMatch(userDto.getPassword(), userDto.getPassword2())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호가 일치하지 않습니다.");
		}

		LibUser user = new LibUser();
		user.bind(userDto);

		try {
			// 회원 정보를 데이터베이스에 저장
			userRepository.save(user);

			return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 완료되었습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 중 오류가 발생했습니다.");
		}
	}

	public void join(LibUser user) {
		userRepository.save(user);

	}

	//로긴처리
	 public LibUser authenticate(String loginid, String password) {
	        try {
	            Optional<LibUser> userOptional = userRepository.findByLoginid(loginid);

	            if (userOptional.isPresent()) {
	                LibUser user = userOptional.get();

	                // 비밀번호 매칭
	                boolean matches = password.equals(user.getPassword());
	                System.out.println("비밀번호 매칭 결과:" + matches);

	                if (matches) {
	                    return user;
	                } else {
	                    System.out.println("비밀번호가 일치하지 않습니다.");
	                    return null; // 비밀번호가 일치하지 않는 경우 null 반환
	                }
	            } else {
	                System.out.println("회원이 존재하지 않습니다.");
	                return null;
	            }
	        } catch (Exception e) {
	            System.out.println("예외:" + e.getMessage());
	            return null;
	        }
	 }

	
	 
	 
		// 아이디 찾기
		public String findIdByEmailAndName(String email, String name) {
			  Optional<LibUser> userOptional = userRepository.findIdByEmailAndName(email, name);
			  return userOptional.map(LibUser::getLoginid).orElse(null);
		}
		
		
		
		
		// 비밀번호찾기 - findPw
		public String findPw(UserDto userDto) {
			Optional<LibUser> foundPw = userRepository.findByLoginidAndEmail(userDto.getLoginid(), userDto.getEmail());
			
			
			if (foundPw.isPresent())
				;
			if (foundPw.isPresent()) {
				LibUser user = foundPw.get();
	
				String tempPassword = generateTempPassword();
				sendEmail(user.getEmail(), "[AnsanLibrary]임시비밀번호", "\n\n 안녕하세요. 임시비밀번호는 다음과 같습니다.\n\n" + tempPassword);
	
				// 데베에 임시비밀번호 저장하는 로직 추가
	String encodedPassword = tempPassword;
				//String encodedPassword = passwordEncoder.encode(tempPassword);
				user.setPassword(encodedPassword);
				userRepository.save(user);
	
				return user.getEmail();
			} else {
				return null;
			}
	
		}
		
		//TempPass - 임시비밀번호 생성
		public String generateTempPassword() {
		SecureRandom random = new SecureRandom();
		StringBuilder password = new StringBuilder(PASSWORD_LENGTH);
		for (int i = 0; i < PASSWORD_LENGTH; i++) {
			password.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
		}
		return password.toString();
	}
		
		private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		private static final int PASSWORD_LENGTH = 10;
	

	//메일보내~
		public void sendEmail(String to, String subject, String text) {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(to);
			message.setSubject(subject);
			message.setText(text);
			//mailSender.send(message);
		}
	
		
		
		
    

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	


	



}