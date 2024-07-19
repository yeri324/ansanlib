package com.ansanlib.book.dto;

import com.ansanlib.constant.BookStatus;
import com.ansanlib.entity.LoanStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookListDto {

	
	private Long id;
	
	private String libName;		// 위치
	private BookStatus status;		// 대출상태
	private LoanStatus loanEnd;	// 반납예정일
	
}
