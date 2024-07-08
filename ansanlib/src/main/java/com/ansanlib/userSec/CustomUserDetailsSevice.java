package com.ansanlib.userSec;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ansanlib.entity.LibUser;
import com.ansanlib.security.CustomUser;
import com.ansanlib.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsSevice implements UserDetailsService {
	
	private final UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String loginid) throws UsernameNotFoundException {

		System.out.println("loadUserByUsername : " + loginid);

		LibUser user = userRepository.findByLoginid(loginid)
				.orElseThrow(() -> new UsernameNotFoundException("일치하는 사용자가 없습니다."));

		CustomUser customUser = new CustomUser(user);

		return customUser;

	}
}
