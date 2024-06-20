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
	
	public Reservation saveReservation(Reservation reservation) throws Exception {
		//예약 기간 중복 검사
		List<Reservation> overlappingReservations = reservationRepository.findOverlappingReservations(
				reservation.getBookIsbn(), reservation.getStartDate(), reservation.getEndDate());
		
		if (!overlappingReservations.isEmpty()) {
			throw new Exception("예약 날짜가 겹쳐 존재합니다.");
		}
		//예약 정보 저장
		return reservationRepository.save(reservation);
	}
	
	public List<Reservation> getReservationByUser(String userId){
		return reservationRepository.findByUserId(userId);
	}
}
