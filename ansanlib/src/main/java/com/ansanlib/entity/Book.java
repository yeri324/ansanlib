package com.ansanlib.entity;

import java.util.Date;

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
@Table(name="book")
public class Book extends BaseEntity {

   @Id
   @Column(name="book_num")
   @GeneratedValue(strategy= GenerationType.SEQUENCE)
   private Long id;
   
   @Column(nullable=false)
   private String isbn;
   
   private String title;
   private String author;
   private String publisher;
   private LocalDateTime pub_date;
   private String genre;
   private String category_code;
   private String image;
   
   @Column(nullable=false)
   private String loan_sataus;
   
   private int count;
}
