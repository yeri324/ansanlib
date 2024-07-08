package com.ansanlib.visit.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class VisitDto {
	
	@NotNull(message = "널 값 불가능")
	private String page;
	
	
}