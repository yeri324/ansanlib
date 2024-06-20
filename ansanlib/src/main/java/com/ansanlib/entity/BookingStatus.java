package com.ansanlib.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name="bookingstatus")
public class BookingStatus extends BaseEntity {

   @Id
    @Column(name="booking_num")
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
   
 
   private int booking_rank; // 예약 순위
   
   private LocalDateTime regist_date;
   private LocalDateTime booking_end; // 예약 마감 날짜
}
