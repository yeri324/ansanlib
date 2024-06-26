package com.ansanlib.book.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookListDto {

	
	private Long id;
	
	private String location;		// 위치
	private String loan_sataus;		// 대충상태
	private String category_code;	// 분류코드
	
}
