package com.ansanlib.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.ansanlib.constant.BookStatus;

import jakarta.persistence.CascadeType;
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
	@Column(name = "isbn_id", unique = true)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String isbn; //isbn(도서고유번호)
	private String title; //제목
	private String author; //저자
	private String publisher; //출판사
	private LocalDate pub_date; //출판일
	private LocalDateTime regist_date; //신청일



	private String lib_name; // 도서관 이름

	
	@ManyToOne
	@OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name="user_id")
    private LibUser libUser;

}
