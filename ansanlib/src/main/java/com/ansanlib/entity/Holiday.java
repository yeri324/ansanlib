package com.ansanlib.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Entity
@Setter
@Getter
@Table(name="holiday")

public class Holiday extends BaseEntity {
   
    @Id
       @GeneratedValue(strategy = GenerationType.IDENTITY)
       @Column(name = "holiday_num")
       private Long id;
   
    @ManyToOne
       private Library library;
   
   private LocalDate holiday; //휴관일
   
   private String lib_name;
   


   }
   
      
   
   

