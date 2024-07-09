package com.ansanlib.board.dto;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;

import com.ansanlib.entity.Notice;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class NoticeFormDto {

private Long id;
    
    @NotBlank(message="제목은 필수 입력 값입니다.")
    private String title;
    @NotBlank(message="내용은 필수 입력 값입니다.")
    private String content;

    private List<Long> idList;
    
//    private List<NoticeImgDto> noticeImgDtoList = new ArrayList<>();
//    
//    private List<Long> noticeImgIdList = new ArrayList<>();
    
    private static ModelMapper modelMapper = new ModelMapper();
    
    public static NoticeFormDto of(Notice notice) {
        return modelMapper.map(notice, NoticeFormDto.class);
    }

    public Notice createNotice() {
        return modelMapper.map(this, Notice.class);
    }
    
    public void updateNotice(NoticeFormDto noticeFormDto) {
    	this.title = noticeFormDto.getTitle();
    	this.content = noticeFormDto.getContent();
    }
}
