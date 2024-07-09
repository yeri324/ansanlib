package com.ansanlib.user.service;

import java.util.Optional;
import java.util.regex.Pattern;

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

import com.ansanlib.entity.LibUser;
import com.ansanlib.security.user.CustomUser;
import com.ansanlib.user.dto.UserDto;
import com.ansanlib.user.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceS {

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
	
	//id 중복검사
	  public ResponseEntity<String> checkId(String loginid) {

	      Optional<LibUser> user = userRepository.findByLoginid(loginid);
	      if (user.isPresent()) {
	         return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 아이디 입니다.");
	      } else {
	         return new ResponseEntity<>("사용 가능한 아이디 입니다.", HttpStatus.OK);
	      }
	   }

	

//	// 비밀번호 일치 확인 메서드
//	public boolean isPasswordMatch(String password, String password2) {
//		return password.equals(password2);
//
//	}

	// checkId 중복검사
//	public ResponseEntity<String> checkId(String loginid) {
//		if (loginid.length() < 5) {
//			return ResponseEntity.status(HttpStatus.CONFLICT).body("아이디는 5글자 이상만 가능합니다.");
//		}
//
//		if (!Pattern.matches("[a-zA-Z0-9]+", loginid)) {
//			return ResponseEntity.status(HttpStatus.CONFLICT).body("아이디는 영문과 숫자만 가능합니다.");
//		}
//
//		Optional<LibUser> user = userRepository.findByLoginid(loginid);
//		if (user.isPresent()) {
//			return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 아이디 입니다.");
//		} else {
//			return new ResponseEntity<>("사용 가능한 아이디 입니다.", HttpStatus.OK);
//		}
//	}

//	//로긴~
//	public LibUser authenticate(String loginid, String password) {
//		try {
//			Optional<LibUser> userOptional = userRepository.findByLoginid(loginid);
//
//			if (userOptional.isPresent()) {
//				LibUser user = userOptional.get();
//
//				// Validate password (use PasswordEncoder for secure validation)
//				boolean matches = passwordEncoder.matches(password, user.getPassword());
//				System.out.println("비밀번호 매칭 결과: " + matches);
//
//				if (matches) {
//					// Update login date
//					user.setLoginDate(LocalDateTime.now());
//					userRepository.save(user); // Save user with updated login date
//
//					return user;
//				} else {
//					System.out.println("비밀번호가 일치하지 않습니다." + loginid + password);
//
//					return null; // Incorrect password
//				}
//			} else {
//				System.out.println("회원이 존재하지 않습니다.");
//				return null; // User not found
//			}
//		} catch (Exception e) {
//			System.out.println("예외:" + e.getMessage());
//			return null;
//		}
//	}

//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		// Retrieve user from database based on username
//		LibUser user = userRepository.findByLoginid(username)
//				.orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
//
//		// Map user details to Spring Security's UserDetails
//		return org.springframework.security.core.userdetails.User.builder().username(user.getLoginid())
//				.password(user.getPassword()) // Already encoded password from database
//				.roles(user.getRole().toString()) // Assuming role is stored as Enum or String
//				.build();
//	}

//    public String getPassword(String userId) {
//         Optional<LibUser> optionalUser = userRepository.findByLoginid(userId);
//        if (optionalUser.isPresent()) {
//             LibUser user = optionalUser.get();
//            return user.getPassword();
//        } else {
//            return null;
//        }
	// }
//
//	// 아이디 찾기
//	public String findIdByEmailAndName(String email, String name) {
//		Optional<LibUser> userOptional = userRepository.findIdByEmailAndName(email, name);
//		return userOptional.map(LibUser::getLoginid).orElse(null);
//	}
//
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

}