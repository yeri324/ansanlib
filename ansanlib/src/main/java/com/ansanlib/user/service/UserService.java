package com.ansanlib.user.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
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
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.book.repository.BookRepository;
import com.ansanlib.constant.Gender;
import com.ansanlib.constant.Role;
import com.ansanlib.entity.LibUser;
import com.ansanlib.entity.Library;
import com.ansanlib.library.LibraryRepository;
import com.ansanlib.user.dto.UserDto;
import com.ansanlib.user.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final BookRepository bookRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final MailService mailService;
	private final LibraryRepository libraryRepository;

	// 비밀번호에 포함될 문자열 세트들을 상수로 정의합니다.
	private static final String LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz"; // 소문자
	private static final String UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // 대문자
	private static final String DIGITS = "0123456789"; // 숫자
	private static final String SPECIAL_CHARS = "!@#$%^&"; // 특수문자

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
	@Transactional
	public void deleteUser(Long userId) throws Exception {
	    Optional<LibUser> optionalUser = userRepository.findById(userId);
	    if (optionalUser.isPresent()) {
	        try {
	        	//사용자 삭제
	            userRepository.deleteById(userId);
	            //연결된 도서의 사용자 초기화
	            bookRepository.resetUserFromBooks(userId);
	        } catch (Exception e) {
	        	e.printStackTrace();
	            throw new Exception("회원 탈퇴 중 오류가 발생했습니다.");
	        }
	    } else {
	        throw new Exception("삭제할 사용자를 찾을 수 없습니다.");
	    }
	}

	// 회원 정보 수정
	@Transactional
    public void updateUser(Long userId, UserDto userDto ) {
        Optional<LibUser> optionalUser = userRepository.findById(userId);
        if(optionalUser.isPresent()) {
            LibUser libUser = optionalUser.get();
            libUser.setName(userDto.getName());
            if (userDto.getPassword() != null && !userDto.getPassword().isEmpty()) {
                libUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
            }
            libUser.setName(userDto.getName());
            libUser.setPhone(userDto.getPhone());
            libUser.setAddress(userDto.getAddress());
            libUser.setAddress2(userDto.getAddress2());
            libUser.setEmail(userDto.getEmail());
            libUser.setSms(userDto.getSms());
            userRepository.save(libUser);
        } else {
            throw new RuntimeException("User not found with id : "+ userId);
        }
    }

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
	
	public void initdata() {
		LibUser user = new LibUser();
        user.setLoginid("admin");
        user.setPassword(passwordEncoder.encode("1234"));
        user.setName("관리자");
        user.setAddress("대전 서구 둔산서로 17");
        user.setAddress2("6층 중앙능력개발원");
        user.setEmail("test@example.com");
        user.setPhone("000-0000-0000");
        user.setGender(Gender.MALE);
        user.setRole(Role.ROLE_ADMIN);
        user.setJoinDate(LocalDateTime.now());
        user.setLoginDate(LocalDateTime.now());
        user.setSms("yes");
        

        userRepository.save(user);

		libraryRepository.save(new Library(null, "7004", "감골도서관", null, null, null));
		libraryRepository.save(new Library(null, "7008", "반월도서관", null, null, null));
		libraryRepository.save(new Library(null, "7011", "부곡도서관", null, null, null));
		libraryRepository.save(new Library(null, "7026", "본오도서관", null, null, null));
		libraryRepository.save(new Library(null, "7006", "상록수도서관", null, null, null));
		libraryRepository.save(new Library(null, "7007", "상록어린이도서관", null, null, null));
		libraryRepository.save(new Library(null, "7003", "성포도서관", null, null, null));
		libraryRepository.save(new Library(null, "7023", "수암도서관", null, null, null));
		libraryRepository.save(new Library(null, "7002", "관산도서관", null, null, null));
		libraryRepository.save(new Library(null, "7005", "단원도서관", null, null, null));
		libraryRepository.save(new Library(null, "7014", "미디어도서관", null, null, null));
		libraryRepository.save(new Library(null, "7028", "선부도서관", null, null, null));
		libraryRepository.save(new Library(null, "7018", "원고잔도서관", null, null, null));
	}

}