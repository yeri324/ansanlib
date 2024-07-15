package com.ansanlib.admin.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminPopupDto {

	private Long id;

	private String title;

	private String imgUrl;

	private LocalDate startDate;

	private LocalDate endDate;
}
