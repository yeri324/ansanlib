package com.ansanlib.controller.reservation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.dto.reservation.CreateReservationDto;
import com.ansanlib.entity.Reservation;
import com.ansanlib.service.reservation.ReservationService;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
	@Autowired
	private ReservationService reservationService;
	
	@PostMapping 
	public ResponseEntity<Reservation> createReservation(@RequestBody CreateReservationDto createReservationDto) {
       try {
    	   Reservation savedReservation = reservationService.createReservation(createReservationDto);
           return ResponseEntity.ok(savedReservation);   
       }catch(Exception e) {
    	   return ResponseEntity.badRequest().body(null);
       }
		
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Reservation>> getReservationsByUser(@PathVariable String userId) {
        List<Reservation> reservations = reservationService.getReservationByUser(userId);
        return ResponseEntity.ok(reservations);
    }
}
