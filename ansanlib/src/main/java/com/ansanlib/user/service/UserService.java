//package com.ansanlib.service.user;
//
//import java.util.Optional;
//import java.util.regex.Pattern;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import com.ansanlib.constant.Role;
//import com.ansanlib.dto.user.UserDto;
//import com.ansanlib.entity.LibUser;
//import com.ansanlib.repository.user.UserRepository;
//
//import lombok.RequiredArgsConstructor;
//
//@Service
//@RequiredArgsConstructor
//public class UserService implements UserDetailsService {
//
//	private final UserRepository userRepository;
//
//
//	// 비밀번호 일치 확인 메서드
//	public boolean isPasswordMatch(String password, String confirmPassword) {
//		return password.equals(confirmPassword);
//	}
//
//	public ResponseEntity<String> signUp(UserDto userDto, PasswordEncoder passwordEncoder) {
//		// 비밀번호 일치 여부 확인
//		if (!isPasswordMatch(userDto.getPassword(), userDto.getConfirmPassword())) {
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호가 일치하지 않습니다.");
//		}
//
//		LibUser user = new LibUser();
//		user.bind(userDto, passwordEncoder);
//		user.Role(Role.USER);
//
//		try {
//			// 회원 정보를 데이터베이스에 저장
//			userRepository.save(user);
//
//			return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 완료되었습니다.");
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 중 오류가 발생했습니다.");
//		}
//	}
//
//	public void signUp(LibUser user) {
//		userRepository.save(user);
//	}
//
//	public ResponseEntity<String> checkId(String loginid) {
//		if (loginid.length() < 5) {
//			return ResponseEntity.status(HttpStatus.CONFLICT).body("아이디는 5글자 이상만 가능합니다.");
//		}
//
//		if (!Pattern.matches("[a-zA-Z0-9]+", loginid)) {
//			return ResponseEntity.status(HttpStatus.CONFLICT).body("아이디는 영문과 숫자만 가능합니다.");
//		}
//
//		Optional<LibUser> user = userRepository.findById(loginid);
//		if (user.isPresent()) {
//			return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 아이디 입니다.");
//		} else {
//			return ResponseEntity.ok("사용 가능한 아이디 입니다.");
//		}
//	}
//
//	public ResponseEntity<String> checkEmail(String email) {
//
//		if (!Pattern.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", email)) {
//			return ResponseEntity.status(HttpStatus.CONFLICT).body("이메일 형식이 올바르지 않습니다.");
//		}
//
//		Optional<LibUser> user = userRepository.findByEmail(email);
//		if (user.isPresent()) {
//			return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 이메일 입니다.");
//		} else {
//			return ResponseEntity.ok("사용 가능한 이메일 입니다.");
//		}
//	}
//
//	@Override
//	public UserDetails loadUserByUsername(String loginid) throws UsernameNotFoundException {
//		Optional<LibUser> optionalUser = userRepository.findById(loginid);
//		if (optionalUser.isEmpty()) {
//			throw new UsernameNotFoundException(loginid);
//		}
//		LibUser user = optionalUser.get();
//		return User.builder().username(user.getLoginid()).password(user.getPassword()).roles(user.getRole.toString())
//				.build();
//	}
//
//	public String getPassword(String userId) {
//		Optional<LibUser> optionalUser = userRepository.findById(userId);
//		if (optionalUser.isPresent()) {
//			LibUser user = optionalUser.get();
//			return user.getPassword();
//		} else {
//			return null;
//		}
//	}
//
//	public LibUser login(String id, String hashedPassword) {
//		Optional<LibUser> optionalMember = userRepository.findByIdAndPassword(id, hashedPassword);
//		return optionalMember.orElse(null);
//	}
//
//	
//	
//
//}
