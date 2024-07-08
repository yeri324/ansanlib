package com.ansanlib.requestBook.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.ansanlib.entity.RequestBook;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestBookDto {
	
	public RequestBookDto(RequestBook entity) {
		this.id = entity.getId();
		this.isbn = entity.getIsbn();
		this.title = entity.getTitle();
		this.author = entity.getAuthor();
		this.publisher = entity.getPublisher();
		this.pub_date = entity.getPub_date();
		this.regist_date = entity.getRegist_date();


	

		this.lib_name = entity.getLib_name();

	}
	
	private Long id;

	private String isbn; //isbn(도서고유번호)
	private String title; //제목
	private String author; //저자
	private String publisher; //출판사
	private LocalDate pub_date; //출판일
	private LocalDateTime regist_date; //신청일


	

	private String lib_name; //도서관 이름

}
