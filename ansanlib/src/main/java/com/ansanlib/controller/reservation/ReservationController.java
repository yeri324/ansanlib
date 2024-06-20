package com.ansanlib.controller.reservation;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.entity.Reservation;
import com.ansanlib.service.reservation.ReservationService;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
	@Autowired
	private ReservationService reservationService;
	
	@PostMapping 
	public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {
        //현재 시간을 예약 시간으로 설정
		reservation.setReservationDate(LocalDateTime.now());
		//예약 날짜로 부터 7일 후를 반납일로 설정
		reservation.setReturnDate(reservation.getReservationDate().plusDays(7));
		//예약 정보를 저장
		Reservation savedReservation = reservationService.saveReservation(reservation);
        return ResponseEntity.ok(savedReservation);
    }

    @GetMapping("/{userName}")
    public ResponseEntity<List<Reservation>> getReservationsByUser(@PathVariable String userName) {
        List<Reservation> reservations = reservationService.getReservationByUser(userName);
        return ResponseEntity.ok(reservations);
    }
}
