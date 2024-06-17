package com.ansanlib.dto.admin.user;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.repository.admin.AdminUserRepository;

import lombok.RequiredArgsConstructor;


public class AdminUserDto {
	
	private String searchBy;
	
	private String sortBy;
	
	private String searchQuery="";
	
	private String ispenalty;

}
