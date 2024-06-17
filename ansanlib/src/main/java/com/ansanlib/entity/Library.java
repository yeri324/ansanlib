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
@Table(name="Library")
@ToString
public class Library extends BaseEntity {
	@Id
	@Column(name="library_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String lib_num;
	
	private String lib_name;
	
	private String address;
	
	private String phone;
	
	private String web_address;
	
}

