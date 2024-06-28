package com.ansanlib.entity;

import java.time.LocalDateTime;

import com.ansanlib.constant.BookStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "book")
public class Book extends BaseEntity {

	@Id
	@JoinColumn(name = "book_num")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String isbn; // 바코드

	private String title; // 제목
	private String author; // 저자
	private String publisher; // 출판사
	private LocalDateTime pub_date; // 출판일
	private String genre; // 장르
	private String category_code; // 분류코드
	private String image; // 이미지

	private String loan_sataus; // 대출상태

	private String location; // 위치

	@Lob
	private String bookDetail; // 책 설명
	private int count;

	@Column(nullable = false) // 책 상태
	private BookStatus status;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="lib_num")
	@JsonIgnore
	private Library library;
}
