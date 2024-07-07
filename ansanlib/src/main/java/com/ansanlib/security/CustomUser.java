package com.ansanlib.security;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ansanlib.entity.LibUser;

import lombok.Data;

@Data
public class CustomUser implements UserDetails {

	private LibUser user;

	public CustomUser(LibUser user) {
		this.user = user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> authorities = new ArrayList<>();

		authorities.add(new SimpleGrantedAuthority(user.getRole().toString()));
		System.out.println("권한 : "+authorities.toString());
		
		return authorities;
	}

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getLoginid();
	}

}
