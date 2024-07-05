package com.ansanlib.user.dto;

import java.time.LocalDateTime;

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
    private String gender;
    private Role role;
    private String sms;
private LocalDateTime joinDate; //가입일

   private LocalDateTime regTime;
   private LocalDateTime loginDate; //최근접속일



    
}