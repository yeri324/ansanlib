package com.ansanlib.board.dto;

import org.modelmapper.ModelMapper;

import com.ansanlib.entity.RecBoard;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RecBoardFormDto {

	private Long id;
    
    @NotBlank(message="제목은 필수 입력 값입니다.")
    private String title;
    @NotBlank(message="내용은 필수 입력 값입니다.")
    private String content;
    
    private String searchQuery="";
    
    private Long bookId;

    private static ModelMapper modelMapper = new ModelMapper();
    
    public static RecBoardFormDto of(RecBoard recBoard) {
    	return modelMapper.map(recBoard, RecBoardFormDto.class);
    }
}
