package com.ansanlib.board.dto;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;

import com.ansanlib.entity.Notice;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class NoticeDto {
	 private Long id;
	    private String title;
	    private String content;
	    
	    private int page;
	    private int size;
	    
	    private String searchBy;
	    private String searchQuery="";
	    
	    private List<NoticeDto> NoticeDtoList = new ArrayList<>();
	    
	    private static ModelMapper modelMapper = new ModelMapper();
	    
	    public static NoticeDto of(Notice notice) {
	        return modelMapper.map(notice, NoticeDto.class);
	    }
}
