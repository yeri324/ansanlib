package com.ansanlib.board.dto;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;

import com.ansanlib.entity.Faq;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FaqFormDto {
    
    private Long id;
    
    @NotBlank(message="제목은 필수 입력 값입니다.")
    private String title;
    @NotBlank(message="내용은 필수 입력 값입니다.")
    private String content;

    private List<Long> idList;
    
    private static ModelMapper modelMapper = new ModelMapper();
    
    public static FaqFormDto of(Faq faq) {
        return modelMapper.map(faq, FaqFormDto.class);
    }

    public Faq createFaq() {
        return modelMapper.map(this, Faq.class);
    }
    
    public void updateFaq(FaqFormDto faqFormDto) {
    	this.title = faqFormDto.getTitle();
    	this.content = faqFormDto.getContent();
    }
    
}