package com.ansanlib.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name="lib_board")
public class Board extends BaseEntity{

    @Id
    @Column(name="board_num")
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    private Long id;
    
    @Column(name="board_title") 
    private String title; // 제목
    
    @Column(name="board_content")
    private String content; //내용
    
    @ManyToOne
    @JoinColumn(name="user_id")
    private LibUser libUser;
}
