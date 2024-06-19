package com.ansanlib.dto.user;
import java.time.LocalDateTime;

import org.hibernate.validator.constraints.Length;

import com.ansanlib.constant.Gender;
import com.ansanlib.constant.Role;
import com.ansanlib.constant.UserStatus;
import com.ansanlib.entity.LibUser;

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
	
	private String password1;
	
	@NotEmpty(message = "주소는 필수 입력 값입니다.")
	private String address;
	


	private String loginid;

	private String phone;

	@NotEmpty(message = "생년월일을 확인해주세요.")
	private LocalDateTime birth;

	private Gender gender;

	private Role role;

	private String sms;

	private LocalDateTime joinDate;

	private LocalDateTime loginDate;

	private int penalty;

	private UserStatus status;

	private int lateFee;
	public static UserFormDto createUserDto(LibUser user) {
		UserFormDto userFormDto = new UserFormDto();
		userFormDto.loginid = user.getLoginid();
		userFormDto.name = user.getName();
		userFormDto.email = user.getEmail();
		userFormDto.password = user.getPassword();
		userFormDto.address = user.getAddress();
	//	userFormDto.address_detail = user.getAddress_detail();
		userFormDto.gender = user.getGender();
		userFormDto.role = user.getRole();
	
		return userFormDto;
	}
}
