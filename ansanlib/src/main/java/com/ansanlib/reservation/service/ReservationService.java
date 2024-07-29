package com.ansanlib.reservation.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ansanlib.admin.service.AdminUserService;
import com.ansanlib.entity.Book;
import com.ansanlib.entity.LibUser;
import com.ansanlib.entity.Reservation;
import com.ansanlib.reservation.dto.CreateReservationDto;
import com.ansanlib.reservation.exception.CreateReservationException;
import com.ansanlib.reservation.repository.ReservationRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class ReservationService {
	@Autowired
	private ReservationRepository reservationRepository;
	
	@Autowired
	private AdminUserService adminUserService;
	
	@Transactional
	public Reservation createReservation(long userId, long bookId, LocalDateTime startDate) throws CreateReservationException {
		//예약 시작 날짜가 오늘 이후인지 확인
		if (!startDate.isAfter(LocalDateTime.now())) {
			throw new CreateReservationException("오늘 이전 날짜에 예약할 수 없습니다");
		}
		
		//예약 종료 날짜
		LocalDateTime endDate = startDate.plusDays(7);

		//예약 entity 생성
		Book book = new Book();
		book.setId(bookId);
		
		//사용자 존재여부 확인
		//TODO: 사용자 서비스 개발완료되면 대체.
		LibUser user;
		try {
			user = adminUserService.getUserById(userId);
		} catch (EntityNotFoundException exception) {
			throw new CreateReservationException("해당 사용자를 찾을수 없습니다.");
		}
		
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
			throw new CreateReservationException("예약 날짜가 겹쳐 존재합니다.");
		}
		
		//예약 정보 저장
		return reservationRepository.save(reservation);
	}
	
	public List<Reservation> getReservationByUser(long userId){
		return reservationRepository.findByUserId(userId);
	}
	
	public Reservation getReservationById(long reservationId){
		return reservationRepository.findById(reservationId);
	}
	
	public void deleteReservation(Long reservationId) throws Exception {
	        Reservation reservation = reservationRepository.findById(reservationId)
	            .orElseThrow(() -> new Exception("예약을 찾을 수 없습니다."));
	        reservationRepository.delete(reservation);
	    }
	
	public void deleteReservationBelongsTo(Long reservationId, Long userId) throws Exception {
		if(reservationRepository.deleteBookBelongsTo(reservationId, userId) == 0) {
			throw new EntityNotFoundException();
		}
    }
	
    //회원 탈퇴 관련
	@Transactional
	public void deleteReservationByUserId (long userId) {
		reservationRepository.deleteByLibUserId(userId);
	}
	
	public List<Reservation> getReservationsByBookId(Long bookId) {
        return reservationRepository.findBybookId_Id(bookId);
    }
}
