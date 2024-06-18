package com.ansanlib.service.admin.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.dto.admin.user.AdminUserDto;
import com.ansanlib.entity.LibUser;
import com.ansanlib.repository.admin.AdminUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminUserService {
	private final AdminUserRepository adminUserRepository;
	
	
	public Page<LibUser> AdminUserList(AdminUserDto adminUserDto,Pageable pageable){
	 return adminUserRepository.AdminUserList(adminUserDto, pageable);
	}

}
