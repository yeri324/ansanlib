package com.ansanlib.repository.admin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ansanlib.dto.admin.user.AdminUserDto;
import com.ansanlib.entity.LibUser;

public interface AdminUserRepositoryCustom {
	Page<LibUser> AdminUserList(AdminUserDto adminUserDto,Pageable pageable);
}
