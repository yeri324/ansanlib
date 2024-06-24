package com.ansanlib.entity;

import java.time.LocalDateTime;

import com.ansanlib.constant.Gender;
import com.ansanlib.constant.Role;
import com.ansanlib.constant.UserStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

//import org.springframework.security.crypto.password.PasswordEncoder;



@Entity
@Getter
@Setter
@Table(name="lib_user")
@ToString
public class LibUser extends BaseEntity {
	
	@Id
	@Column(name="user_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long userId;
	
	@Column(name="user_name")
	private String name; //이름
	
	@Column(unique = true)
	private String email; //이메일
	
	private String loginid; //사용자아이디
	
	
	private String password; //비밀번호
	
	private String phone; //전화번호
	
	private String address; //주소
	
	private String address2; //상세주소
	

	@Enumerated(EnumType.STRING)
	private Gender gender; //성별

	@Enumerated(EnumType.STRING)
	private Role role; //역할
	
	private String sms; //문자 수신동의
	
	private LocalDateTime joinDate; //가입일
	
	private LocalDateTime loginDate; //최근접속일
	
	private int penalty; //벌점
	
	private UserStatus status; //제재여부
	
	private int lateFee; //연체료

	
	
	
//	public static LibUser createUser(UserDto userFormDto, PasswordEncoder passwordEncoder) {
//		LibUser user = new LibUser();
//		user.setName(userFormDto.getName());
//		user.setEmail(userFormDto.getEmail());
//		user.setAddress(userFormDto.getAddress());
//		user.setAddress2(userFormDto.getAddress2());
//		
//		user.setLoginid(userFormDto.getLoginid());
//		user.setLoginDate(userFormDto.getLoginDate());
//	
//		user.setJoinDate(userFormDto.getJoinDate());
//	
//		user.setSms(userFormDto.getSms());
//		
//		String password = passwordEncoder.encode(userFormDto.getPassword());
//		user.setPassword(password);
//		user.setRole(Role.USER);
//	
//		return user;
//	}
}