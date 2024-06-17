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
@Table(name="requestbook")
public class RequestBook extends BaseEntity {

   @Id
    @Column(name="isbn")
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    private String isbn;
   
   private String title;
   private String author;
   private String publisher;
   private Date pub_date;
   private Date regist_date;

}
