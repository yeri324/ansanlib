package com.ansanlib.controller.admin;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ansanlib.dto.admin.user.AdminUserDto;
import com.ansanlib.entity.LibUser;
import com.ansanlib.service.admin.user.AdminUserService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
//@RequestMapping(value = "/")
public class AdminUserController {
	final AdminUserService adminUserService;
	
	@GetMapping("/adminUserList")
	public String adminUserList(AdminUserDto adminUserDto,Optional<Integer> page,Model model){
		Pageable pageable =PageRequest.of(page.isPresent()?page.get():0, 6);
		Page<LibUser> users = adminUserService.AdminUserList(adminUserDto, pageable);
		
		model.addAttribute("users", users);
		model.addAttribute("maxPage", 5);
		return "/admin/userForm";
	}
	
}
