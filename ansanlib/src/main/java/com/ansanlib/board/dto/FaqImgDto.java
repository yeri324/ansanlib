package com.ansanlib.board.dto;

import org.modelmapper.ModelMapper;

import com.ansanlib.entity.FaqImg;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FaqImgDto {

	private Long id; 
	private String imgName; 
	private String oriImgName; 
	private String imgUrl; 

	private static ModelMapper modelMapper = new ModelMapper();

	public static FaqImgDto of(FaqImg faqImg) {
		return modelMapper.map(faqImg, FaqImgDto.class);
	}
}
