package com.ansanlib.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "book_reservation")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id; //예약번호
	
	@ManyToOne
	@JoinColumn(name = "book_id", nullable = false)
    private Book bookId; //도서번호
    
	@ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private LibUser libUser; //사용자번호
    
    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate; //예약시작일
    
    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate; //예약종료일
}
