package com.ansanlib.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginRequest {
	private String loginid;
    private String password;
}
