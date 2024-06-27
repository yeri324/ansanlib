package com.ansanlib.admin.dto;

import java.time.LocalDateTime;

import org.modelmapper.ModelMapper;

import com.ansanlib.entity.LibUser;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminDetailUserDto {
	private Long id;
	
	private LocalDateTime exDate; 
	
	private static ModelMapper modelMapper = new ModelMapper();
	
	public static AdminDetailUserDto of(LibUser libUser) {
        return modelMapper.map(libUser, AdminDetailUserDto.class);
    }
}
