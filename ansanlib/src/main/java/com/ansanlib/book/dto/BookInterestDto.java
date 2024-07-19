package com.ansanlib.book.dto;

import com.ansanlib.constant.BookStatus;
import com.ansanlib.entity.Book;
import com.ansanlib.entity.BookImg;
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
    private BookImg bookImg;

    public BookInterestDto(BookInterest bookInterest) {
        Book book = bookInterest.getBook();
        this.id = bookInterest.getId();
        this.title = book.getTitle();
        this.author = book.getAuthor();
        this.publisher = book.getPublisher();
        this.pubDate = book.getPub_date();
        this.categoryCode = book.getCategory_code();
        this.libName = book.getLibName();
        this.status = book.getStatus();
        this.bookImg = book.getBookImg();
    }
}