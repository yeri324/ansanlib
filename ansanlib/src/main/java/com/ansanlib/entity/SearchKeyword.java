package com.ansanlib.entity;

import java.io.Serializable;

import com.ansanlib.constant.Gender;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "search_keywords")
public class SearchKeyword implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private LibUser user;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Gender gender;
	
	@Column(nullable = false)
	private String keyword;


}
