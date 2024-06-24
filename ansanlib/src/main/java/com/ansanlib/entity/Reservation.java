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
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "book_id", nullable = false)
    private Book bookId;
    
	@ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private LibUser libUser;
    
    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;
    
    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;
}
