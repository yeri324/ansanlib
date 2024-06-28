package com.ansanlib.board.dto;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;

import com.ansanlib.entity.Faq;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FaqDto {


    private Long id;
    private String title;
    private String content;
    
    private String searchBy;
    private String searchQuery="";
    
    private List<FaqDto> faqDtoList = new ArrayList<>();
    
    private static ModelMapper modelMapper = new ModelMapper();
    
    public static FaqDto of(Faq faq) {
        return modelMapper.map(faq, FaqDto.class);
    }
    
}

