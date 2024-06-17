package com.ansanlib.entity;

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
@Table(name="faq")
public class Faq extends BaseEntity {

   @Id
   @Column(name="board_num")
   @GeneratedValue(strategy= GenerationType.SEQUENCE)
   private Long id;
   
   private String title;
   private String content;
}
