package com.ansanlib.book.dto;

import com.ansanlib.constant.BookStatus;
import com.ansanlib.entity.Book;
import com.ansanlib.entity.BookInterest;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class BookInterestDto {
	private Long id;
    private String title;
    private String author;
    private String publisher;
    private String pubDate;
    private String categoryCode;
    private String libName;
    private BookStatus status;
    private String bookImg;

    public static BookInterestDto fromEntity(BookInterest bookInterest) {
        Book book = bookInterest.getBook();
        return new BookInterestDto(
            bookInterest.getId(),
            book.getTitle(),
            book.getAuthor(),
            book.getPublisher(),
            book.getPub_date(),
            book.getCategory_code(),
            book.getLibName(),
            book.getStatus(),
            book.getBookImg() != null ? book.getBookImg().getImgUrl() : null
        );
    }
}
