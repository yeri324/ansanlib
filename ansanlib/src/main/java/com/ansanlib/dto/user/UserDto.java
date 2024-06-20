//package com.ansanlib.dto.user;
//
//import java.time.LocalDateTime;
//
//import org.hibernate.validator.constraints.Length;
//
//import com.ansanlib.constant.Gender;
//import com.ansanlib.constant.Role;
//import com.ansanlib.entity.LibUser;
//
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.NotEmpty;
//import lombok.Getter;
//import lombok.Setter;
//
//@Getter
//@Setter
//public class UserDto {
//	
//	private Long id;
//
//	@NotBlank(message = "이름은 필수 입력 값입니다.")
//	private String name;
//	
//	@NotEmpty(message = "이메일은 필수 입력 값입니다.")
//	private String email;
//	
//	@NotEmpty(message = "비밀번호는 필수 입력 값입니다.")
//	@Length(min=8, max=16, message = "비밀번호는 8자 이상, 16자 이하로 입력해주세요")
//	private String password;
//	
//	@NotEmpty(message = "비밀번호가 일치하지 않습니다.")
//	private String password2;
//	
//	@NotEmpty(message = "주소는 필수 입력 값입니다.")
//	private String address;
//	private String address2;
//	
//	
//	@NotEmpty(message = "아이디는 필수 입력 값입니다.")
//	private String loginid;
//	
//	@NotEmpty(message = "전화번호는 필수 입력 값입니다.")
//	private String phone;
//	
//
//	
//
//	private Gender gender;
//
//	
//	@NotEmpty(message = "수신정보에 체크하여주세요")
//	private String sms;
//	
//	
//	private LocalDateTime joinDate;
//	
//	private LocalDateTime loginDate;
//	
//	private String penalty;
//	
//	private String status;
//
//	private Role role;
//
//	public static UserDto createUserDto(LibUser user) {
//		UserDto userDto = new UserDto();
//		userDto.loginid = user.getLoginid();
//		userDto.name = user.getName();
//		userDto.email = user.getEmail();
//		userDto.password = user.getPassword();
//		userDto.address = user.getAddress();
//		userDto.address2 = user.getAddress2();
//		userDto.gender = user.getGender();
//		userDto.role = user.getRole();
//		userDto.phone=user.getPhone();
//		
//
//		return userDto;
//	}
//
//}
//
