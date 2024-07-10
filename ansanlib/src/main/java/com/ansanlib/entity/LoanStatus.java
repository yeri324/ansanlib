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
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "LoanStatus")
public class LoanStatus extends BaseEntity {

	@Id
	@Column(name = "Loan_num")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "loan_start", nullable = false)
	private LocalDateTime loanStart; //대출시작일

	@Column(name = "loan_end", nullable = false)
	private LocalDateTime loanEnd; //대출만료일

	@ManyToOne
	@JoinColumn(name = "book_id", nullable = false)
	private Book book; //도서번호

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private LibUser libuser; //사용자번호

}
