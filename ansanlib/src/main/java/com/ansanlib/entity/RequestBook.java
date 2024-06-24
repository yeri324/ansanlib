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
@Table(name = "requestbook")
public class RequestBook extends BaseEntity {

	@Id
	@Column(name = "isbn_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String isbn; //isbn(도서고유번호)
	private String title; //제목
	private String author; //저자
	private String publisher; //출판사
	private LocalDateTime pub_date; //출판일
	private LocalDateTime regist_date; //신청일
	
	@ManyToOne
    @JoinColumn(name="user_id")
    private LibUser libUser;

}
