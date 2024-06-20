package com.ansanlib.entity;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.ansanlib.constant.Gender;
import com.ansanlib.constant.Role;
import com.ansanlib.constant.UserStatus;
import com.ansanlib.dto.user.UserFormDto;

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
	private Long user_id;
	
	@Column(name="user_name")
	private String name;
	
	@Column(unique = true)
	private String email;
	
	private String loginid;
	
	
	private String password;
	
	private String phone;
	
	private String address;
	
	private String address2;
	

	@Enumerated(EnumType.STRING)
	private Gender gender;

	@Enumerated(EnumType.STRING)
	private Role role;
	
	private String sms;
	
	private LocalDateTime joinDate;
	
	private LocalDateTime loginDate;
	
	private int penalty;
	
	private UserStatus status;
	
	private int lateFee;

	
	
	
	public static LibUser createUser(UserFormDto userFormDto, PasswordEncoder passwordEncoder) {
		LibUser user = new LibUser();
		user.setName(userFormDto.getName());
		user.setEmail(userFormDto.getEmail());
		user.setAddress(userFormDto.getAddress());
		user.setAddress2(userFormDto.getAddress2());
		
		user.setLoginid(userFormDto.getLoginid());
		user.setLoginDate(userFormDto.getLoginDate());
	
		user.setJoinDate(userFormDto.getJoinDate());
	
		user.setSms(userFormDto.getSms());
		
		String password = passwordEncoder.encode(userFormDto.getPassword());
		user.setPassword(password);
		user.setRole(Role.USER);
	
		return user;
	}
}