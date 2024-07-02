package com.ansanlib.user;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ansanlib.entity.LibUser;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CustomUserDtails implements UserDetails {
	
	private LibUser user;
	
	
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.singleton(new SimpleGrantedAuthority(user.getRole().name()));
	}

	@Override
	public String getPassword() {
		 return user.getPassword();
	}

	@Override
	public String getUsername() {
		 return user.getLoginid();
	}
	 @Override
	    public boolean isAccountNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isAccountNonLocked() {
	        return true;
	    }

	    @Override
	    public boolean isCredentialsNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isEnabled() {
	        return true;
	    }

		public CustomUserDtails(LibUser user) {
			this.user = user;
		}

}
