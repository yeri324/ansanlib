package com.ansanlib.reservation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.entity.Reservation;
import com.ansanlib.reservation.dto.CreateReservationDto;
import com.ansanlib.reservation.dto.ReservationDto;
import com.ansanlib.reservation.exception.CreateReservationException;
import com.ansanlib.reservation.service.ReservationService;
import com.ansanlib.user.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
	@Autowired
	private ReservationService reservationService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping 
	public ResponseEntity<?> createReservation(@RequestBody CreateReservationDto createReservationDto) {
       try {
    	   Reservation savedReservation = reservationService.createReservation(createReservationDto);
    	   ReservationDto savedReservaationDto = new ReservationDto(savedReservation);
           return ResponseEntity.ok(savedReservaationDto);   
       } catch(CreateReservationException e1) {
    	   return ResponseEntity.badRequest().body(e1.getMessage());
       } catch(RuntimeException e2) {
    	   return ResponseEntity.badRequest().body("서버 내부 오류.");
       }
		
    }

    @GetMapping("/get/by-user/{userId}")
    public ResponseEntity<List<ReservationDto>> getReservationsByUser(@PathVariable Long userId, HttpServletRequest httpRequest) {
//    	if(httpRequest.getSession().getAttribute("userId") == null || !userService.existsById(userId)) {
//    		 return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//    	}
        List<Reservation> reservations = reservationService.getReservationByUser(userId);
        List<ReservationDto> reservationsDto = reservations.stream().map(ReservationDto::new).toList();
        if(reservationsDto.isEmpty()) {
        	return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(reservationsDto);
    }
 
    @GetMapping("/get/by-id/{reservationId}")
    public ResponseEntity<ReservationDto> getReservationById(@PathVariable Long reservationId){
    	Reservation reservation = reservationService.getReservationById(reservationId);
    	if(reservation != null) {
    		ReservationDto reservationDto = new ReservationDto(reservation);
    		return ResponseEntity.ok(reservationDto);
    	} else {
    		return ResponseEntity.notFound().build();
    	}
    }
    
    @DeleteMapping("/{reservationId}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long reservationId) {
        try {
            reservationService.deleteReservation(reservationId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
 
}