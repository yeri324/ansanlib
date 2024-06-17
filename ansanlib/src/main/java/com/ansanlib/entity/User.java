package com.ansanlib.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name="lib_user")
@ToString
public class User extends BaseEntity {
	@Id
	@Column(name="user_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	
	private String name;
	
	private String email;
	
	private String loginid;
	
	private String password;
	
	private String phone;
	
	private String address;
	
	private LocalDateTime birth;
	
	private LocalDateTime gender;

	private String role;
	
	private String sms;
	
	private LocalDateTime joinDate;
	
	private LocalDateTime loginDate;
	
	private String penalty;
	
	private String status;
}
