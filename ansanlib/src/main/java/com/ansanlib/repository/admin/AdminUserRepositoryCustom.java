package com.ansanlib.repository.admin;

import java.util.List;

import com.ansanlib.dto.admin.user.AdminUserDto;
import com.ansanlib.entity.LibUser;

public interface AdminUserRepositoryCustom {
	List<LibUser> AdminUserList(AdminUserDto adminUserDto);
}
