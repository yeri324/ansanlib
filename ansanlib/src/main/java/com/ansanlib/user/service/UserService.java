package com.ansanlib.user.service;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Service;

import com.ansanlib.entity.LibUser;
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
	private final MailService mailService;

	// 비밀번호에 포함될 문자열 세트들을 상수로 정의합니다.
	private static final String LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz"; // 소문자
	private static final String UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // 대문자
	private static final String DIGITS = "0123456789"; // 숫자
	private static final String SPECIAL_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?"; // 특수문자

	// 비밀번호의 최소 길이와 최대 길이를 상수로 정의합니다.
	private static final int MIN_LENGTH = 8;
	private static final int MAX_LENGTH = 10;

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
		if (userOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK).body(userOptional.get().getLoginid());
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("일치하는 사용자가 없습니다.");
		}
	}

	// 임시 비밀번호 생성 및 전송
	@Transactional
	public ResponseEntity<String> resetPassword(String loginid, String email) {
		Optional<LibUser> user = userRepository.findByLoginidAndEmail(loginid, email);
		if (user == null) {
			System.out.println("일치하는 사용자가 없습니다.");// 사용자가 존재하지 않는 경우 처리
			return null;
		}

		// 임시 비밀번호 생성 로직 (예시)
		if (user != null && user.get().getEmail().equals(email)) {
			String temporaryPassword = createTempPassword();
			System.out.println("임시 비밀번호는 "+temporaryPassword+"입니다.");
			user.get().setPassword(passwordEncoder.encode(temporaryPassword));
			userRepository.save(user.get());

			// 여기서 이메일 전송 로직 추가 (실제로는 이메일 전송 라이브러리 등을 사용)
			mailService.sendResetPassword(email, temporaryPassword);

		} else {
			throw new RuntimeException("사용자 정보를 찾을 수 없습니다.");
		}

		return null;
	}

	// 임시 비밀번호 생성
	private static String createTempPassword() {
		SecureRandom random = new SecureRandom();
		List<Character> passwordChars = new ArrayList<>();

		// 최소한 두 가지 종류의 문자를 포함하도록 설정
		includeRandomChars(passwordChars, LOWERCASE_CHARS, 1, random);
		includeRandomChars(passwordChars, UPPERCASE_CHARS, 1, random);
		includeRandomChars(passwordChars, DIGITS, 1, random);
		includeRandomChars(passwordChars, SPECIAL_CHARS, 1, random);

		// 남은 길이만큼 랜덤하게 모든 문자 세트에서 문자를 추가
		int remainingLength = MIN_LENGTH - passwordChars.size();
		includeRandomChars(passwordChars, LOWERCASE_CHARS + UPPERCASE_CHARS + DIGITS + SPECIAL_CHARS, remainingLength,
				random);

		// 비밀번호 문자들을 섞습니다.
		Collections.shuffle(passwordChars);

		// List<Character>를 String으로 변환하여 최종 임시 비밀번호를 생성
		StringBuilder password = new StringBuilder();
		for (Character ch : passwordChars) {
			password.append(ch);
		}

		return password.toString();
	}

	// 주어진 문자 세트에서 랜덤하게 count 개수만큼 문자를 리스트에 추가하는 메서드입니다.
	private static void includeRandomChars(List<Character> list, String characters, int count, SecureRandom random) {
		for (int i = 0; i < count; i++) {
			list.add(characters.charAt(random.nextInt(characters.length())));
		}
	}

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