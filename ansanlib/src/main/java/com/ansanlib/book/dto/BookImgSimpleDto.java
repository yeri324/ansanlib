package com.ansanlib.book.dto;

import com.ansanlib.entity.BookImg;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BookImgSimpleDto {
    private BookImg imgUrl;
}