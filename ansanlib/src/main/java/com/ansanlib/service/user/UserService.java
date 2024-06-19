//package com.ansanlib.service.user;
//
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.ansanlib.entity.LibUser;
//import com.ansanlib.repository.user.UserRepository;
//
//import lombok.RequiredArgsConstructor;
//
//@Service
//@Transactional
//@RequiredArgsConstructor
//public class UserService implements UserDetailsService {
//
//	private final UserRepository userRepository;
//
//	public LibUser saveUser(LibUser user) {
//		validateDuplicateUser(user);
//		return userRepository.save(user);
//	}
//
//	private void validateDuplicateUser(LibUser user) {
//		LibUser findUser = userRepository.findByEmail(user.getEmail());
//		if (findUser != null) {
//			throw new IllegalStateException("이미 가입된 회원입니다.");
//		}
//	}
//
//	@Override
//	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//		LibUser user = userRepository.findByEmail(email);
//		if (user == null) {
//			throw new UsernameNotFoundException(email);
//		}
//		return User.builder()
//				.username(user.getEmail())
//				.password(user.getPassword())
//				.roles(user.getRole().toString())
//				.build();
//	
//	}
//
//}
