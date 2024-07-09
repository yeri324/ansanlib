package com.ansanlib.board.dto;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;

import com.ansanlib.entity.Board;
import com.ansanlib.entity.Faq;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BoardFormDto {

private Long id;
    
    @NotBlank(message="제목은 필수 입력 값입니다.")
    private String title;
    @NotBlank(message="내용은 필수 입력 값입니다.")
    private String content;

    private List<Long> idList;
    
    private List<BoardImgDto> boardImgDtoList = new ArrayList<>();
    
    private List<Long> boardImgIdList = new ArrayList<>();
    
    private static ModelMapper modelMapper = new ModelMapper();
    
    public static BoardFormDto of(Board board) {
        return modelMapper.map(board, BoardFormDto.class);
    }

    public Board createBoard() {
        return modelMapper.map(this, Board.class);
    }
    
    public void updateBoard(BoardFormDto boardFormDto) {
    	this.title = boardFormDto.getTitle();
    	this.content = boardFormDto.getContent();
    }
}
