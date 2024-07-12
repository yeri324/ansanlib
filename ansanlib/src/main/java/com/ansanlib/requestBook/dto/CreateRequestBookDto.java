package com.ansanlib.requestBook.dto;

import java.time.LocalDate;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class CreateRequestBookDto {
	private String isbn;
	private String title;
	private String author;
	private String publisher;
	private LocalDate pubDate;
	private String lib_name;
}
