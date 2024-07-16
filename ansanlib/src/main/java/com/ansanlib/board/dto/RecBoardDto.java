package com.ansanlib.board.dto;

import org.modelmapper.ModelMapper;

import com.ansanlib.entity.RecBoard;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RecBoardDto {

	private Long id;
    private String title;
    private String content;
    private String searchQuery="";
    
    private int page;
    private int size;
    
    private static ModelMapper modelMapper = new ModelMapper();
    
    public static RecBoardDto of(RecBoard recBoard) {
    	return modelMapper.map(recBoard, RecBoardDto.class);
    }
}
