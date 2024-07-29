package com.ansanlib.book.dto;

import com.ansanlib.constant.BookStatus;
import com.ansanlib.entity.BookImg;
import com.ansanlib.reservation.dto.ReservationDto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookListDto {

    private Long id;
    private BookImg bookImg;	// 책이미지
    private String isbn; // 바코드
    private String title; // 제목
    private String author; // 저자
    private String publisher; // 출판 날짜
    private String pub_date; // 출판 날짜
    private String category_code; // 분류 코드
    private String libName; // 위치
    private BookStatus status; // 대출 상태
    private ReservationDto endDate; // 예약종료일
}
