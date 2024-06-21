package com.ansanlib.reservation.controller;

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
import com.ansanlib.reservation.dto.CreateReservationDto;
import com.ansanlib.reservation.service.ReservationService;

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

    @GetMapping("/get/by-user/{userId}")
    public ResponseEntity<List<Reservation>> getReservationsByUser(@PathVariable String userId) {
        List<Reservation> reservations = reservationService.getReservationByUser(userId);
        if(reservations.isEmpty()) {
        	return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(reservations);
    }
 
    @GetMapping("/get/by-id/{reservationId}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Long reservationId){
    	Reservation reservation = reservationService.getReservationById(reservationId);
    	if(reservation != null) {
    		return ResponseEntity.ok(reservation);
    	} else {
    		return ResponseEntity.notFound().build();
    	}
    }
 
}
