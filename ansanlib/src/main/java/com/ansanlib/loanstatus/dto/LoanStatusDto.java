package com.ansanlib.loanstatus.dto;

import java.time.LocalDateTime;

import com.ansanlib.book.dto.BookDto;
import com.ansanlib.book.dto.BookDto.BookDtoBuilder;
import com.ansanlib.book.dto.BookImgSimpleDto;
import com.ansanlib.entity.Book;
import com.ansanlib.entity.LoanStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoanStatusDto {
	
	public LoanStatusDto(LoanStatus entity) {
		//BookService.java#findBookById() 참고
		Book book = entity.getBook();
		
		//dto 생성
		BookDtoBuilder bookDtoBuilder = BookDto.builder()
			.title(book.getTitle())
			.author(book.getAuthor())
			.publisher(book.getPublisher())
			.pub_date(book.getPub_date())
			.isbn(book.getIsbn())
			.status(book.getStatus().toString())
			.location(book.getLocation());
		
		if(book.getBookDetail() != null) {
			String detail = book.getBookDetail().replace("\r\n","<br>");
			bookDtoBuilder = bookDtoBuilder.bookDetail(detail);
		}
		
		if(book.getBookImg() != null && book.getBookImg().getImgUrl() != null) {
			bookDtoBuilder = bookDtoBuilder.bookImg(new BookImgSimpleDto(book.getBookImg().getImgUrl()));
		}
		
		BookDto bookDto = bookDtoBuilder.build();
		
		this.id = entity.getId();
		this.loanStart = entity.getLoanStart();
		this.loanEnd = entity.getLoanEnd();
		this.book = bookDto;
		this.user_id = entity.getLibuser().getUserId();
	}
	
	private Long id;
	private LocalDateTime loanStart; //대출시작일
	private LocalDateTime loanEnd; //대출만료일
	private BookDto book; //도서번호
	private Long user_id; //사용자번호
}
