package com.ansanlib.board.dto;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;

import com.ansanlib.entity.Board;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BoardDto {
	 private Long id;
	    private String title;
	    private String content;
	    
	    private int page;
	    private int size;
	    
	    private String searchBy;
	    private String searchQuery="";
	    
	    private List<BoardDto> BoardDtoList = new ArrayList<>();
	    
	    private static ModelMapper modelMapper = new ModelMapper();
	    
	    public static BoardDto of(Board board) {
	        return modelMapper.map(board, BoardDto.class);
	    }
}
