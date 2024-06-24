package com.ansanlib.reservation.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ansanlib.entity.Book;
import com.ansanlib.entity.LibUser;
import com.ansanlib.entity.Reservation;
import com.ansanlib.reservation.dto.CreateReservationDto;
import com.ansanlib.reservation.repository.ReservationRepository;

@Service
public class ReservationService {
	@Autowired
	private ReservationRepository reservationRepository;
	
	public Reservation createReservation(CreateReservationDto createReservationDto) throws Exception {
		//예약 시작 날짜
		LocalDateTime startDate = createReservationDto.getReservationDate();
		
		//예약 시작 날짜가 오늘 이후인지 확인
		if (!startDate.isAfter(LocalDateTime.now())) {
			throw new Exception("이전 날짜에 예약할 수 없습니다");
		}
		
		//예약 종료 날짜
		LocalDateTime endDate = LocalDateTime.now().plusDays(7);
		
		//예약 entity 생성
		Book book = new Book();
		book.setId(createReservationDto.getBookId());
		LibUser user = new LibUser();
		user.setUserId(createReservationDto.getBookId());
		
		Reservation reservation = Reservation.builder()
				.bookId(book)
				.libUser(user)
				.startDate(startDate)
				.endDate(endDate)
				.build();
		
		//예약 기간 중복 검사
		if (reservationRepository.checkIfOverlappingReservationsExists(
				reservation.getBookId().getId(),
				reservation.getStartDate(),
				reservation.getEndDate()
		)) {
			throw new Exception("예약 날짜가 겹쳐 존재합니다.");
		}
		
		//예약 정보 저장
		return reservationRepository.save(reservation);
	}
	
	public List<Reservation> getReservationByUser(Long user_id){
		return reservationRepository.findByLibUser_UserId(user_id);
	}
	
	public Reservation getReservationById(long reservationId){
		return reservationRepository.findById(reservationId);
	}
}
