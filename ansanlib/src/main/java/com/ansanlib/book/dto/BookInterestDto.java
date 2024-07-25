package com.ansanlib.book.dto;

import java.time.LocalDateTime;

import com.ansanlib.entity.Book;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookInterestDto {
    private Long id;
    private Book book;
    private LocalDateTime regTime;
}