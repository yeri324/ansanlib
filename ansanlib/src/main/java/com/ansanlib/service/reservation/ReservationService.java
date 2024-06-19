
package com.ansanlib.service.reservation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ansanlib.entity.Reservation;
import com.ansanlib.repository.reservation.ReservationRepository;

@Service
public class ReservationService {
	@Autowired
	private ReservationRepository reservationRepository;
	
	public Reservation saveReservation(Reservation reservation) {
		return reservationRepository.save(reservation);
	}
	
	public List<Reservation> getReservationByUser(String userName){
		return reservationRepository.findByUserName(userName);
	}
}
