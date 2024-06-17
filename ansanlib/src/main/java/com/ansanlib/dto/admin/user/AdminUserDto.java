package com.ansanlib.dto.admin.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminUserDto {
	
	private String searchBy;
	
	private String sortBy;
	
	private String searchQuery="";
	
	private String ispenalty;

}
