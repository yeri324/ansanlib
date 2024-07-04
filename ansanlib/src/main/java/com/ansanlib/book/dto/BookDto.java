package com.ansanlib.book.dto;

import java.util.List;

import com.ansanlib.constant.BookStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookDto {

	private Long id;
	
	private String isbn; 			// 바코드
	private String title; 			// 제목
	private String author; 			// 저자
	private String publisher; 		// 출판사
	private String pub_date; // 출판 날짜
	private String genre; 			// 장르
	private String category_code; 	// 분류 코드
	private BookStatus status; 	// 대출 상태
	private String bookDetail;  	// 책 설명
	private String location;    	// 위치
	private BookImgSimpleDto bookImg;	// 책이미지
	
	public void setRelatedBooks(List<BookListDto> bookList) {
		
	}
}
