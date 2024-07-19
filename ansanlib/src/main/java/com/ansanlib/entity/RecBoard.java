package com.ansanlib.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "rec_board")
public class RecBoard extends BaseEntity {

	@Id
	@Column(name = "rec_board_num")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title; // 제목
	private String content; // 내용

	@OneToOne
	@JoinColumn(name="book_num")
	private Book book;
}
