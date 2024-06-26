package com.ansanlib.admin.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

	// 모든 유저 가져오기
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public ResponseEntity<List<LibUser>> userList() {
		List<LibUser> userList = adminUserService.getUserList();
		return ResponseEntity.ok(userList);
	}

	// 검색으로 찾기
	@PostMapping("/search")
	public ResponseEntity<List<LibUser>> searchUsers(@RequestBody AdminUserDto adminUserDto) {

		List<LibUser> users = adminUserService.ListUser(adminUserDto);

		return ResponseEntity.ok(users);
	}

	// 유저정보 가져오기
	@PostMapping("/detail")
	public ResponseEntity getUserDetails(@RequestBody AdminDetailUserDto adminDetailUserDto) {

		LibUser user = adminUserService.getUserById(adminDetailUserDto);
		return ResponseEntity.ok(user);

	}

	// 예약정보가져오기
	@PostMapping("/getRes")
	public ResponseEntity getUserRes(@RequestBody AdminDetailUserDto adminDetailUserDto) {
		List<Reservation> res = adminUserService.getReservation(adminDetailUserDto);
		return ResponseEntity.ok(res);
	}

	// 제재상태부여하기
	@PutMapping("/penalty")
	public ResponseEntity updateFaq(@RequestBody AdminDetailUserDto adminDetailUserDto) throws Exception {
		LibUser updateUser = adminUserService.updateUserStatus(adminDetailUserDto);
		return ResponseEntity.ok(updateUser);
	}

	// 예약취소하기
	@DeleteMapping("/cancelRes")
	public ResponseEntity cancelRes(@RequestBody AdminDetailUserDto adminDetailUserDto) throws Exception {
		adminUserService.cancelRes(adminDetailUserDto.getId());
		return ResponseEntity.ok("삭제완료");
	}
	
	@PostMapping("/bookRes")
	public ResponseEntity BookRes(@RequestBody AdminDetailUserDto adminDetailUserDto) throws Exception {
		List<Reservation> res =  adminUserService.getBookRes(adminDetailUserDto);
		return ResponseEntity.ok(res);
	}

}
