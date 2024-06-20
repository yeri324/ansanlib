package com.ansanlib.admin.repository;

import java.util.List;

import com.ansanlib.admin.dto.AdminUserDto;
import com.ansanlib.entity.LibUser;

public interface AdminUserRepositoryCustom {
	List<LibUser> AdminUserList(AdminUserDto adminUserDto);
}
