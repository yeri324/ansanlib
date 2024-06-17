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
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@Column(nullable=false)
	private String name;
	
	@Column(nullable=false)
	private String email;
	
	@Column(nullable=false)
	private String loginid;
	
	@Column(nullable=false)
	private String password;
	
	@Column(nullable=false)
	private String phone;
	
	private String address;
	
	@Column(nullable=false)
	private LocalDateTime birth;
	
	@Column(nullable=false)
	private LocalDateTime gender;
	
	@Column(nullable=false)
	private String role;
	
	@Column(nullable=false)
	private String sms;
	
	@Column(nullable=false)
	private LocalDateTime joinDate;
	
	private LocalDateTime loginDate;
	
	private String penalty;
	
	private String status;
}
