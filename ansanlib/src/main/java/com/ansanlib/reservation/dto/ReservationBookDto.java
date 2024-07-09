package com.ansanlib.reservation.dto;

import java.time.LocalDateTime;

import com.ansanlib.entity.Book;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservationBookDto {
	private Long id;

	private String isbn; // 바코드

	private String title; // 제목
	private String author; // 저자
	private String publisher; // 출판사
	private String pub_date; // 출판일
	private String genre; // 장르
	private String category_code; // 분류코드
	
	public ReservationBookDto(Book entity) {
		this.id = entity.getId();
		this.isbn = entity.getIsbn();
		this.title = entity.getTitle();
		this.author = entity.getAuthor();
		this.publisher = entity.getPublisher();
		this.pub_date = entity.getPub_date();
		this.genre = entity.getGenre();
		this.category_code = entity.getCategory_code();
	}
}
