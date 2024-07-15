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



}