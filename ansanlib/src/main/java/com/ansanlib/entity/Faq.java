package com.ansanlib.entity;

import java.util.ArrayList;
import java.util.List;

import com.ansanlib.board.dto.FaqFormDto;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name="faq")
public class Faq extends BaseEntity {

   @Id
   @Column(name="faq_num")
   @GeneratedValue(strategy= GenerationType.SEQUENCE)
   private Long id;
   
   private String title; //제목
   private String content; //내용
   
   @ManyToOne
   @JoinColumn(name="user_id")
   private LibUser libUser;
   
   @JsonManagedReference
   @OneToMany(mappedBy = "faq", fetch=FetchType.LAZY, cascade = CascadeType.PERSIST, orphanRemoval = true)
   private List<FaqImg> faqImgs = new ArrayList<>();
   
   public void updateFaq(FaqFormDto faqFormDto) {
	   this.title = faqFormDto.getTitle();
	   this.content = faqFormDto.getContent();
	}
   
}
