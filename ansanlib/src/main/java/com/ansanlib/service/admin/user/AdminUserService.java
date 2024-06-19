package com.ansanlib.service.admin.user;

import java.util.ArrayList;
import java.util.List;

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
public class AdminUserService {public List<LibUser> ListUser(AdminUserDto adminUserDto) {
		// TODO Auto-generated method stub
		return null;
	}

public LibUser getUserById(Long id) {
	// TODO Auto-generated method stub
	return null;
}
//	private final AdminUserRepository adminUserRepository;
//	
//	public Page<AdminUserDto> ListUser(AdminUserDto adminUserDto,Pageable pageable){
//		
//		
		
//	}

}
