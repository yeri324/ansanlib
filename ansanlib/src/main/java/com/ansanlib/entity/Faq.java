package com.ansanlib.entity;

import java.util.ArrayList;
import java.util.List;

import com.ansanlib.board.dto.FaqFormDto;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ConstraintMode;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
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
   @GeneratedValue(strategy= GenerationType.IDENTITY)
   private Long id;
   
   private String title; //제목
   private String content; //내용
   private int count; // 조회수
   
   @ManyToOne
   //외래키 연결 해제. faq를 작성한 사용자가 탈퇴해도 게시물은 유지.
   @JoinColumn(name="user_id", referencedColumnName = "user_id", foreignKey = @ForeignKey(value = ConstraintMode.NO_CONSTRAINT))
   private LibUser libUser;
   
   @JsonManagedReference
   @OneToMany(mappedBy = "faq", fetch=FetchType.LAZY, cascade = CascadeType.PERSIST, orphanRemoval = true)
   private List<FaqImg> faqImgs = new ArrayList<>();
   
   public void updateFaq(FaqFormDto faqFormDto) {
	   this.title = faqFormDto.getTitle();
	   this.content = faqFormDto.getContent();
	}
   
}
