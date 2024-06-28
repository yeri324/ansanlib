package com.ansanlib.book.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BookSearchCondition {

	private String isbn; // 바코드
	private String title; // 제목
	private String author; // 저자
	private String publisher; // 출판사
	private String pub_date; // 출판 날짜
	private String category_code; // 분류 코드
}
