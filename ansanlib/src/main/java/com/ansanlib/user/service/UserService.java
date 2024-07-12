package com.ansanlib.user.service;

import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.entity.Faq;
import com.ansanlib.entity.LibUser;
import com.ansanlib.security.user.CustomUser;
import com.ansanlib.user.dto.UserDto;
import com.ansanlib.user.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;

	// 회원가입
	public ResponseEntity<String> join(UserDto userDto) throws Exception {
		if (!(userDto.getPassword().equals(userDto.getPassword2()))) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호가 일치하지 않습니다.");
		}
		String encodePw = passwordEncoder.encode(userDto.getPassword());
		userDto.setPassword(encodePw);
		LibUser user = new LibUser();
		user.bind(userDto);
		// 회원 정보를 데이터베이스에 저장
		try {
			userRepository.save(user);
			return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 완료되었습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 중 오류가 발생했습니다.");
		}
	}

	// 회원조회
	public LibUser select(Long id) throws Exception {
		return userRepository.findById(id).orElseThrow(EntityNotFoundException::new);
	}

	// 로그인
	public void login(UserDto userDto, HttpServletRequest request) throws Exception {
		String loginid = userDto.getLoginid();
		String password = userDto.getPassword();

		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginid, password);
		token.setDetails(new WebAuthenticationDetails(request));

		Authentication authentication = authenticationManager.authenticate(token);

		System.out.println("인증여부 : " + authentication.isAuthenticated());

		User authUser = (User) authentication.getPrincipal();

		System.out.println("인증된 사용자 아이디 : " + authUser.getUsername());

		SecurityContextHolder.getContext().setAuthentication(authentication);
	}

	// 회원 삭제
	public ResponseEntity<?> delete(Long userId) throws Exception {
		try {
			userRepository.deleteById(userId);
			return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
		}
	}

	// 회원 수정
//	  public int update(UserDto userDto) throws Exception {
//		  LibUser user = userRepository.findByLoginid(userDto.getLoginid()).orElseThrow(EntityNotFoundException::new);
//	        // 비밀번호 암호화
//	        String password = userDto.getPassword();
//	        String encodedPw = passwordEncoder.encode(password);
//	        userDto.setPassword(encodedPw);
//	        
//	        //추후수정
//	    }

	// id 중복검사
	public ResponseEntity<String> checkId(String loginid) {

		Optional<LibUser> user = userRepository.findByLoginid(loginid);
		if (user.isPresent()) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 아이디 입니다.");
		} else {
			return new ResponseEntity<>("사용 가능한 아이디 입니다.", HttpStatus.OK);
		}
	}

	// email 중복검사
	public ResponseEntity<String> checkEmail(String email) {

		Optional<LibUser> user = userRepository.findByEmail(email);
		if (user.isPresent()) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 이메일 입니다.");
		} else {
			return new ResponseEntity<>("사용 가능한 이메일 입니다.", HttpStatus.OK);
		}
	}

	
	// 아이디 찾기
	public ResponseEntity<String> findIdByEmailAndName(String email, String name) {
		Optional<LibUser> userOptional = userRepository.findIdByEmailAndName(email, name);
		if(userOptional.isPresent()) {
		return ResponseEntity.status(HttpStatus.OK).body(userOptional.get().getLoginid());}
		else {
			return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("일치하는 사용자가 없습니다.");
		}
	}
	
//	//임시 비밀번호 생성
//	 public ResponseEntity<String> createTempPassword(String loginid, String email) {
//	        Optional<LibUser> user = userRepository.findByLoginidAndEmail(loginid, email);
//	        if (user == null) {
//	            return null; // 사용자가 존재하지 않는 경우 처리
//	        }
//
//	        // 임시 비밀번호 생성 로직 (예시)
//	        String temporaryPassword = createTempPassword();
//	        user.setPassword(temporaryPassword);
//	        userRepository.save(user);
//
//	        // 여기서 이메일 전송 로직 추가 (실제로는 이메일 전송 라이브러리 등을 사용)
//	        sendTemporaryPasswordByEmail(email, temporaryPassword);
//
//	        return temporaryPassword;
//	    }
//	
//	// TempPass - 임시비밀번호 생성
//	public String generateTempPassword() {
//		SecureRandom random = new SecureRandom();
//		StringBuilder password = new StringBuilder(PASSWORD_LENGTH);
//		for (int i = 0; i < PASSWORD_LENGTH; i++) {
//			password.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
//		}
//		return password.toString();
//	}
//
//	private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//	private static final int PASSWORD_LENGTH = 10;
//
//	// 메일보내~
//	public void sendEmail(String to, String subject, String text) {
//		SimpleMailMessage message = new SimpleMailMessage();
//		message.setTo(to);
//		message.setSubject(subject);
//		message.setText(text);
//		// mailSender.send(message);
//	}
	

//	// 비밀번호찾기 - findPw
//	public String findPw(UserDto userDto) {
//		Optional<LibUser> foundPw = userRepository.findByLoginidAndEmail(userDto.getLoginid(), userDto.getEmail());
//
//		if (foundPw.isPresent())
//			;
//		if (foundPw.isPresent()) {
//			LibUser user = foundPw.get();
//
//			String tempPassword = generateTempPassword();
//			System.out.println("임시 비밀번호: " + tempPassword); // 콘솔에 임시 비밀번호 출력
//
//			sendEmail(user.getEmail(), "[AnsanLibrary]임시비밀번호", "\n\n 안녕하세요. 임시비밀번호는 다음과 같습니다.\n\n" + tempPassword);
//
//			// 데베에 임시비밀번호 저장하는 로직 추가
//			// String encodedPassword = tempPassword;
//			String encodedPassword = passwordEncoder.encode(tempPassword);
//			user.setPassword(encodedPassword);
//			userRepository.save(user);
//
//			return user.getEmail();
//		} else {
//			return null;
//		}
//
//	}
}