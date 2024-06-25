package com.ansanlib.user.dto;

import com.ansanlib.constant.Gender;
import com.ansanlib.constant.Role;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {
    private String name;
    private String email;
    private String loginid;
    private String password;
    private String password2;
    private String phone;
    private String address;
    private String address2;
    private Gender gender;
  //  private Role role;
    
    private String sms;

	

    // Getters and setters (omitted for brevity)

    
}
