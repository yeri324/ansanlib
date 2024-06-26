package com.ansanlib.book.dto;

import org.modelmapper.ModelMapper;

import com.ansanlib.entity.BookImg;

public class BookImgDto {

	private Long id;

    private String imgName; //이미지 파일명

    private String oriImgName; //원본 이미지 파일명

    private String imgUrl; //이미지 조회 경로

    private static ModelMapper modelMapper = new ModelMapper();

    public static BookImgDto of(BookImg bookImg){
        return modelMapper.map(bookImg, BookImgDto.class);
    }
}
