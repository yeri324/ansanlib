package com.ansanlib.entity;

import java.time.LocalDateTime;

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
	private Long user_id;

	@Column(name = "user_name")
	private String name;

	@Column(unique = true)
	private String email;

	@Column(name = "login_id")
	private String loginid;

	private String password;

	private String phone;
	@Column(name = "address")
	private String address;

	@Column(name = "address2")
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