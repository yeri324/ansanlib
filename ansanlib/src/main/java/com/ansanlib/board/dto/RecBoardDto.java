package com.ansanlib.board.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RecBoardDto {
	private long id;
    private String title;
    private String content;
    private long bookId;
    private String searchQuery="";
    
    private int page;
    private int size;
    
  
}
