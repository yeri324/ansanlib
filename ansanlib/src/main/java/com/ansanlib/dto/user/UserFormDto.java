package com.ansanlib.dto.user;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.validator.constraints.Length;

import com.ansanlib.constant.Gender;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserFormDto {

	@NotBlank(message = "이름은 필수 입력 값입니다.")
	private String name;
	
	@NotEmpty(message = "이메일은 필수 입력 값입니다.")
	@Email(message = "이메일 형식으로 입력해주세요.")
	private String email;
	
	@NotEmpty(message = "비밀번호는 필수 입력 값입니다.")
	@Length(min=8, max=16, message = "비밀번호는 8자 이상, 16자 이하로 입력해주세요")
	private String password;
	
	
	private String address;
	
	
	@NotEmpty(message = "아이디는 필수 입력 값입니다.")
	private String loginid;
	
	@NotEmpty(message = "전화번호는 필수 입력 값입니다.")
	private String phone;
	

	@NotEmpty(message = "생년월일은 필수 입력 값입니다.")
	private LocalDate birth;
	
	@NotEmpty(message = "필수사항입니다..")
	private Gender gender;

	
	@NotEmpty(message = "수신정보에 체크하여주세요")
	private String sms;
	
	
	private LocalDateTime joinDate;
	
	private LocalDateTime loginDate;
	
	private String penalty;
	
	private String status;

}