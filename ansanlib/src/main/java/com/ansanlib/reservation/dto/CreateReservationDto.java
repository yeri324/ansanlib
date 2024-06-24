package com.ansanlib.reservation.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateReservationDto {
	private Long bookId;
	private Long userId;
	private LocalDateTime reservationDate;
}
