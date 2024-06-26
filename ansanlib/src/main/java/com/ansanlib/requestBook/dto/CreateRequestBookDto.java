package com.ansanlib.requestBook.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateRequestBookDto {
	private Long id;
	private String isbn;
	private String title;
	private String author;
	private String publisher;
	private LocalDateTime pubDate;
	private LocalDateTime registDate;
	private Long userId;
}
