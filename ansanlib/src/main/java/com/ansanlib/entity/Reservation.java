package com.ansanlib.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "book_reservation")
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id; 
	
	@Column(nullable = false)
	private String userName; // 회원 이름
	
	@Column(nullable = false)
	private String bookIsbn; // 책 isbn
	
	@Column(nullable = false)
	private LocalDateTime reservationDate;//대여일
	
	private LocalDateTime returnDate; // 반납일 
}
