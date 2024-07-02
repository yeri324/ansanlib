package com.ansanlib.user.service;



import java.util.Optional;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ansanlib.entity.LibUser;
import com.ansanlib.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
	
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder; 
	
	public LibUser authenticate(String loginid, String password) {
	    try {
	        Optional<LibUser> userOptional = userRepository.findByLoginid(loginid);

	        if (userOptional.isPresent()) {
	            LibUser user = userOptional.get();
	            
	            // 비밀번호 매칭
	            boolean matches = passwordEncoder.matches(password, user.getPassword());
	            System.out.println("비밀번호 매칭 결과: " + matches);
	            if (matches) {
	                System.out.println("사용자 인증 성공: " + user.getLoginid());
	                return user; // 비밀번호가 일치하는 경우 회원 정보 반환
	            } else {
	                System.out.println("비밀번호가 일치하지 않습니다.");
	                return null; // 비밀번호가 일치하지 않는 경우 null 반환
	            }
	        } else {
	            System.out.println("회원이 존재하지 않습니다.");
	            return null; // 회원이 존재하지 않는 경우 null 반환
	        }
	    } catch (Exception e) {
	        System.out.println("예외: " + e.getMessage());
	        return null; // 예외 발생 시 null 반환
	    }
	}

	@Override
	public UserDetails loadUserByUsername(String loginid) throws UsernameNotFoundException {
	    System.out.println(loginid+"********");
	    Optional<LibUser> optionalUser = userRepository.findByLoginid(loginid);
	    if (optionalUser.isEmpty()) {
	        throw new UsernameNotFoundException(loginid);
	    }
	    LibUser user = optionalUser.get();
	

	    return User.builder()
	               .username(user.getLoginid())  // 변경: loginid를 username으로 반환
	               .password(user.getPassword())
	               .roles(user.getRole().toString())
	               .build();
	}
	
	 
}
