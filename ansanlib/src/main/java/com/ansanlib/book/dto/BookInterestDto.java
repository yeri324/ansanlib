package com.ansanlib.book.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class BookInterestDto {
    private Long id;
    private BookDto book;
    private LocalDateTime regTime;
}
