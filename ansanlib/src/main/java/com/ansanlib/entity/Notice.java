package com.ansanlib.entity;

import java.util.ArrayList;
import java.util.List;

import com.ansanlib.board.dto.NoticeFormDto;
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
@Table(name="notice")
public class Notice extends BaseEntity{

    @Id
    @Column(name="notice_num")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    
    private String title; // 제목
    
    private String content; //내용
    
    @JsonManagedReference
    @OneToMany(mappedBy = "notice", fetch=FetchType.LAZY, cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<NoticeImg> noticeImgs = new ArrayList<>();
    
    @ManyToOne
    @JoinColumn(name="user_id")
    private LibUser libUser;
    
    public void updateNotice(NoticeFormDto noticeFormDto) {
    	this.title = noticeFormDto.getTitle();
    	this.content = noticeFormDto.getContent();
    }
}
