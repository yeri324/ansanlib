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
@Table(name="book")
public class Book extends BaseEntity {

   @Id
   @Column(name="book_num")
   @GeneratedValue(strategy= GenerationType.AUTO)
   private Long id;
   
 
   private String isbn;
   
   private String title;
   private String author;
   private String publisher;
   private LocalDateTime pub_date;
   private String genre;
   private String category_code;
   private String image;

   private String loan_sataus;
   
   private int count;
}
