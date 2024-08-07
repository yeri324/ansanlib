package com.ansanlib.reservation.dto;

import java.time.LocalDateTime;
import com.ansanlib.entity.Reservation;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservationDto {
	public ReservationDto(Reservation entity) {
		this.id = entity.getId();
		this.book = new ReservationBookDto(entity.getBookId());
		this.userId = entity.getLibUser().getUserId();
		this.startDate = entity.getStartDate();
		this.endDate = entity.getEndDate();
	}
	
	private Long id; //예약번호
    private ReservationBookDto book;
    private long userId; //사용자번호
    private LocalDateTime startDate; //예약시작일
    private LocalDateTime endDate; //예약종료일
}
