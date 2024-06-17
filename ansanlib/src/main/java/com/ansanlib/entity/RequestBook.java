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
@Table(name="requestbook")
public class RequestBook extends BaseEntity {

   @Id
    @Column(name="isbn")
    @GeneratedValue(strategy= GenerationType.AUTO)
    private String isbn;
   
   private String title;
   private String author;
   private String publisher;
   private LocalDateTime pub_date;
   private LocalDateTime regist_date;

}
