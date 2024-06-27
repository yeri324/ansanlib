package com.ansanlib.requestBook.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateRequestBookDto {
	private String isbn;
	private String title;
	private String author;
	private String publisher;
	private LocalDate pubDate;
	private Long userId;
}
