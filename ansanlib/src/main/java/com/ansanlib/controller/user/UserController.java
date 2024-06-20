//package com.ansanlib.controller.user;
//
//import java.util.List;
//
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.validation.BindingResult;
//import org.springframework.validation.ObjectError;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.servlet.mvc.support.RedirectAttributes;
//
//import com.ansanlib.dto.user.UserFormDto;
//import com.ansanlib.entity.LibUser;
//import com.ansanlib.service.user.UserService;
//
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//
//@RequestMapping("users")
//@Controller
//@RequiredArgsConstructor
//public class UserController {
//
//	private final UserService userService;
//	private final PasswordEncoder passwordEncoder;
//
//	@GetMapping(value = "/new")
//	public String userForm(Model model) {
//		model.addAttribute("userFormDto", new UserFormDto());
//		return "user/userForm";
//	}
//
//	@PostMapping(value = "/new")
//	public String newUser(@Valid UserFormDto userFormDto, BindingResult bindingResult, Model model) {
//		if (bindingResult.hasErrors()) {
//			return "user/userForm";
//		}
//		try {
//			LibUser user = LibUser.createUser(userFormDto, passwordEncoder);
//			userService.saveUser(user);
//		} catch (IllegalStateException e) {
//			model.addAttribute("errorMessage", e.getMessage());
//			return "user/userForm";
//		}
//		return "redirect:/";
//	}
//
//	@GetMapping(value = "/login")
//	public String loginUser() {
//		return "/user/userLoginForm";
//	}
//
//	@GetMapping(value = "/login/error")
//	public String loginError(Model model) {
//		model.addAttribute("loginErrorMsg", "아이디 또는 비밀번호를 확인해주세요");
//		return "/user/userLoginForm";
//	}
//
//	// 아이디 찾기 뷰
//	@GetMapping(value = "/findid")
//	public String findidForm(Model model) {
//		model.addAttribute("userFormDto", new UserFormDto());
//		return "/user/findidForm";
//	}
//
//	//비밀번호 찾기 뷰
//	@GetMapping(value = "/findpwd")
//	public String findpwdForm(Model model) {
//		model.addAttribute("userFormDto", new UserFormDto());
//		return "/user/findpwdForm";
//	}
//
//}
