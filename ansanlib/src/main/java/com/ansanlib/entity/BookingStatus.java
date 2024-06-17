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
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    private Long id;
   
   @Column(nullable=false)
   private int booking_rank;
   
   private LocalDateTime regist_date;
   private LocalDateTime booking_end;
}
