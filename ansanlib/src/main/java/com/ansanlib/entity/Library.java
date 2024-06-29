package com.ansanlib.entity;

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
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	
	@Column(unique = true)
	private String lib_num; //도서관 코드
	
	private String lib_name; // 도서관 이름
	
	private String address; // 도서관 주소
	
	private String phone; // 도서관 번호
	
	private String web_address; // 도서관 웹주소
	
}

