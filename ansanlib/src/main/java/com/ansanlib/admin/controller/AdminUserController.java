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
import com.ansanlib.entity.LoanStatus;
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
	 public ResponseEntity<List<LibUser>> getUserList() {
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

		LibUser user = adminUserService.getUserById(adminDetailUserDto.getId());
		return ResponseEntity.ok(user);

	}

	// 예약정보가져오기
	@PostMapping("/getRes")
	public ResponseEntity getUserRes(@RequestBody AdminDetailUserDto adminDetailUserDto) {
		List<Reservation> res = adminUserService.getReservation(adminDetailUserDto);
		return ResponseEntity.ok(res);
	}
	
	// 대출정보가져오기
		@PostMapping("/getLoan")
		public ResponseEntity getUserLoan(@RequestBody AdminDetailUserDto adminDetailUserDto) {
			List<LoanStatus> loan = adminUserService.getLoanStatus(adminDetailUserDto);
			return ResponseEntity.ok(loan);
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
	
	// 대출반납하기
		@DeleteMapping("/return")
		public ResponseEntity returnBook(@RequestBody AdminDetailUserDto adminDetailUserDto) throws Exception {
			adminUserService.returnBook(adminDetailUserDto.getId());
			return ResponseEntity.ok("삭제완료");
		}
	
	//책 예약정보 가져오기
	@PostMapping("/bookRes")
	public ResponseEntity BookRes(@RequestBody AdminDetailUserDto adminDetailUserDto) throws Exception {
		List<Reservation> res =  adminUserService.getBookRes(adminDetailUserDto);
		return ResponseEntity.ok(res);
	}
	
	//연체료반납하기
	@PutMapping("/pay")
	public ResponseEntity toPay(@RequestBody AdminDetailUserDto adminDetailUserDto) throws Exception {
		LibUser updateUser = adminUserService.payLateFee(adminDetailUserDto);
		return ResponseEntity.ok(updateUser);
	}
	
	//예약기간연장하기
	@PutMapping("/extendRes")
	public ResponseEntity extendRes(@RequestBody AdminDetailUserDto adminDetailUserDto) throws Exception {
		Reservation updateRes = adminUserService.extendRes(adminDetailUserDto);
		return ResponseEntity.ok(updateRes);
	}
	

}
