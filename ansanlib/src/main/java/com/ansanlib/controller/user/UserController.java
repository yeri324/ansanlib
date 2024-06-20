package com.ansanlib.controller.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ansanlib.constant.Role;
import com.ansanlib.dto.user.UserFormDto;
import com.ansanlib.entity.LibUser;
import com.ansanlib.service.user.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequestMapping("users")
@Controller
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	private final PasswordEncoder passwordEncoder;

	@GetMapping(value = "/new")
	public String userForm(Model model) {
		model.addAttribute("userFormDto", new UserFormDto());
		return "user/userForm";
	}

	@PostMapping(value = "/new")
	public String newUser(@Valid UserFormDto userFormDto, BindingResult bindingResult, Model model) {
		if (bindingResult.hasErrors()) {
			return "user/userForm";
		}
		try {
			LibUser user = LibUser.createUser(userFormDto, passwordEncoder);
			userService.saveUser(user);
		} catch (IllegalStateException e) {
			model.addAttribute("errorMessage", e.getMessage());
			return "user/userForm";
		}
		return "redirect:user/userForm";
	}

	@GetMapping(value = "/login")
	public String loginUser() {
		return "/user/userLoginForm";
	}

	@GetMapping(value = "/login/error")
	public String loginError(Model model) {
		model.addAttribute("loginErrorMsg", "아이디 또는 비밀번호를 확인해주세요");
		return "/user/userLoginForm";
	}

	// 아이디 찾기 뷰
	@GetMapping(value = "/findid")
	public String findidForm(Model model) {
		model.addAttribute("userFormDto", new UserFormDto());
		return "/user/findidForm";
	}

	// 비밀번호 찾기 뷰
	@GetMapping(value = "/findpwd")
	public String findpwdForm(Model model) {
		model.addAttribute("userFormDto", new UserFormDto());
		return "/user/findpwdForm";
	}

	// 임시 회원 만들기
	@GetMapping("/create")
	public ResponseEntity<String> test() {
		LibUser user = new LibUser();


		user.setLoginid("test");
		user.setName("홍길동");
		user.setPassword(passwordEncoder.encode("1234"));
		// user.setBirth(LocalDateTime.of(2000, 01, 01));
		user.setPhone("010-1234-1234");
		user.setEmail("test@test.com");
		user.setAddress("대전시 중구");
		user.setSms("동의");

		user.setRole(Role.USER);

		userService.saveUser(user);
		return ResponseEntity.ok("테스트 유저");
	}

}
