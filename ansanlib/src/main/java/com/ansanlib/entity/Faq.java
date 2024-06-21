package com.ansanlib.entity;

import com.ansanlib.board.dto.FaqFormDto;

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
   @Column(name="faq_num")
   @GeneratedValue(strategy= GenerationType.AUTO)
   private Long id;
   
   private String title;
   private String content;
   
   public void updateFaq(FaqFormDto faqFormDto) {
	   this.id = faqFormDto.getId();
	   this.title = faqFormDto.getTitle();
	   this.content = faqFormDto.getContent();
	}
   
}
