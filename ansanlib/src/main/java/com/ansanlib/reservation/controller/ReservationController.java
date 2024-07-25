package com.ansanlib.reservation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.entity.LibUser;
import com.ansanlib.entity.Reservation;
import com.ansanlib.reservation.dto.CreateReservationDto;
import com.ansanlib.reservation.dto.ReservationDto;
import com.ansanlib.reservation.exception.CreateReservationException;
import com.ansanlib.reservation.service.ReservationService;
import com.ansanlib.security.user.CustomUser;
import com.ansanlib.user.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
	@Autowired
	private ReservationService reservationService;

	@Autowired
	private UserService userService;

	@PostMapping("/create")
	public ResponseEntity<?> createReservation(@AuthenticationPrincipal CustomUser user, @RequestBody CreateReservationDto createReservationDto) {
		if(user == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Logged in.");
		}
		long userId = user.getUser().getUserId();
	    try {
		    Reservation savedReservation = reservationService.createReservation(userId, createReservationDto.getBookId(), createReservationDto.getReservationDate());
		    ReservationDto savedReservaationDto = new ReservationDto(savedReservation);
	        return ResponseEntity.ok(savedReservaationDto);   
	    } catch(CreateReservationException e1) {
		    return ResponseEntity.badRequest().body(e1.getMessage());
	    } catch(RuntimeException e2) {
		    return ResponseEntity.badRequest().body("서버 내부 오류.");
	    }
		
    }

	@GetMapping("/get")
	public ResponseEntity<?> getReservationsByUser(@AuthenticationPrincipal CustomUser user,
			HttpServletRequest httpRequest) {
		if(user == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Logged in.");
		}
		long userId = user.getUser().getUserId();
		List<Reservation> reservations = reservationService.getReservationByUser(userId);
		List<ReservationDto> reservationsDto = reservations.stream().map(ReservationDto::new).toList();
		if (reservationsDto.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(reservationsDto);
	}


	@DeleteMapping("/delete/{reservationId}")
	public ResponseEntity<?> deleteReservation(@AuthenticationPrincipal CustomUser user, @PathVariable Long reservationId) {
		if(user == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Logged in.");
		}
		long userId = user.getUser().getUserId();
		try {
			reservationService.deleteReservationBelongsTo(reservationId, userId);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/get_name")
	public ResponseEntity<?> getName(@AuthenticationPrincipal CustomUser user) {
		if(user == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Logged in.");
		}
		long userId = user.getUser().getUserId();
		try {
			LibUser fullLibUser = userService.select(userId);
			String realName = fullLibUser.getName();
			return ResponseEntity.ok(realName);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}