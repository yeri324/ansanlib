package com.ansanlib.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;

import com.ansanlib.constant.Gender;
import com.ansanlib.constant.Role;
import com.ansanlib.constant.UserStatus;
import com.ansanlib.user.dto.UserDto;

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
@Table(name = "lib_user")
@ToString
public class LibUser extends BaseEntity {

	@Id
	@Column(name = "user_id")
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
	private LocalDateTime penaltyDate; //제재마감시간
	
	private int lateFee; //연체료

	public LibUser bind(UserDto userDto) {
		this.setLoginid(userDto.getLoginid());
		// this.setPassword(passwordEncoder.encode(userDto.getPassword()));
		this.setName(userDto.getName());

		this.setAddress(userDto.getAddress());
		this.setAddress2(userDto.getAddress2());
		// this.setBirth(userDto.getBirth());
		this.setEmail(userDto.getEmail());
		this.setPhone(userDto.getPhone());

		return this;
	}
	


}