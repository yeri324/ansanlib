package com.ansanlib.service.admin.user;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.dto.admin.user.AdminUserDto;
import com.ansanlib.entity.LibUser;
import com.ansanlib.repository.admin.AdminUserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminUserService {
	private final AdminUserRepository adminUserRepository;

	public List<LibUser> ListUser(AdminUserDto adminUserDto) {
		return adminUserRepository.AdminUserList(adminUserDto);
	}

	public LibUser getUserById(Long id) {
		Optional<LibUser> user = adminUserRepository.findById(id);
		return user.orElseThrow(EntityNotFoundException::new);
	}
	
}
