package com.ansanlib.admin.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.admin.dto.AdminDetailUserDto;
import com.ansanlib.admin.dto.AdminUserDto;
import com.ansanlib.admin.service.AdminUserService;
import com.ansanlib.entity.LibUser;
import com.ansanlib.entity.Reservation;
import com.ansanlib.reservation.service.ReservationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/admin/user")
public class AdminUserController {

	private final AdminUserService adminUserService;
	private final ReservationService reservationService;

//	@GetMapping("/search")
//    public String searchUsers(@ModelAttribute AdminUserDto adminUserDto, Model model) {
//		
//        List<LibUser> users = adminUserService.ListUser(adminUserDto);
//        model.addAttribute("users", users);
//        return "admin/userForm";
//    } 

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public ResponseEntity<List<LibUser>> userList() {
		List<LibUser> userList = adminUserService.getUserList();
		return ResponseEntity.ok(userList);
	}

	@PostMapping("/search")
	public ResponseEntity<List<LibUser>> searchUsers(@RequestBody AdminUserDto adminUserDto) {

		List<LibUser> users = adminUserService.ListUser(adminUserDto);

		return ResponseEntity.ok(users);
	}

	@PostMapping("/detail")
	public ResponseEntity getUserDetails(@RequestBody AdminDetailUserDto adminDetailUserDto) {
		System.out.println(adminDetailUserDto + "**************************************************");
		LibUser user = adminUserService.getUserById(adminDetailUserDto);
//		Reservation res = adminUserService.getReservation(adminDetailUserDto);
		return ResponseEntity.ok(user);

	}

}
