
package com.ansanlib.service.reservation;

import java.time.LocalDateTime;
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
		//예약 날짜 설정
		reservation.setReservationDate(LocalDateTime.now());
		
		// 반납 날짜 설정 (7일 후)
		LocalDateTime returnDate = LocalDateTime.now().plusDays(7);
		reservation.setReturnDate(returnDate);
		
		return reservationRepository.save(reservation);
	}
	
	public List<Reservation> getReservationByUser(String userName){
		return reservationRepository.findByUserName(userName);
	}
}
