package com.ansanlib.reservation.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateReservationDto {
	private String bookIsbn;
	private String userId;
	private LocalDateTime reservationDate;
}
