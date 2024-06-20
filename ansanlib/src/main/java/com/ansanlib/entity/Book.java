package com.ansanlib.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name="book")
public class Book extends BaseEntity {

	@Id
	@Column(name="book_num")
	@GeneratedValue(strategy= GenerationType.AUTO)
	private Long id;
   
 
    private String isbn; // 바코드
	private String title; // 제목
	private String author; // 저자
	private String publisher; // 출판사
	private LocalDateTime pub_date; // 출판 날짜
	private String genre; // 장르
	private String category_code; // 분류 코드
	private String image; // 이미지
	private String loan_sataus; // 대출 상태
   
	@Lob
	private String book_detail; // 책 설명
	private int count;
}
