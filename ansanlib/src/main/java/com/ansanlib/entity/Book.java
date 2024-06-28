package com.ansanlib.entity;

import com.ansanlib.book.dto.BookFormDto;
import com.ansanlib.constant.BookStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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
	@Column(name = "book_num")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String isbn; // 바코드

	private String title; // 제목
	private String author; // 저자
	private String publisher; // 출판사
	private String pub_date; // 출판일
	private String genre; // 장르
	private String category_code; // 분류코드

	private String location; // 위치

	@Lob
	private String bookDetail; // 책 설명
	private int count;

	@Enumerated(EnumType.STRING)
	private BookStatus status;
	
	@OneToOne(mappedBy = "book")
    private BookImg bookImg;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private LibUser libUser;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="lib_num")
	private Library library;
	
	public void updateBook(BookFormDto itemFormDto){

    }
}
