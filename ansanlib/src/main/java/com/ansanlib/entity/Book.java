package com.ansanlib.entity;

import java.time.LocalDateTime;

import com.ansanlib.constant.BookStatus;

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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name="book")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Book extends BaseEntity {

	@Id
	@Column(name="book_num")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(nullable = false)
	private String isbn; 			// 바코드
	
	@Column(nullable = false)
	private String title; 			// 제목
	
	@Column(nullable = false)
	private String author;			// 저자
	
	@Column(nullable = false)
	private String publisher;		// 출판사
	
	@Column(nullable = false)
	private LocalDateTime pub_date; // 출판 날짜
	
	@Column(nullable = false)
	private String genre; 			// 장르
	
	@Column(nullable = false)
	private String category_code; 	// 분류 코드
	
	private String image; 			// 이미지
	
	@Column(nullable = false)
	private String loan_status; 	// 대출 상태
	private String location;		// 위치
	
	@Lob
	private String bookDetail; 		// 책 설명
	private int count;
	
	@Column(nullable = false)
	private BookStatus status;
}
