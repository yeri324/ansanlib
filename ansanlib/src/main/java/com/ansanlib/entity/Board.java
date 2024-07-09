package com.ansanlib.entity;

import java.util.ArrayList;
import java.util.List;

import com.ansanlib.board.dto.BoardFormDto;
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
@Table(name="board")
public class Board extends BaseEntity{

    @Id
    @Column(name="board_num")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    
    @Column(name="board_title") 
    private String title; // 제목
    
    @Column(name="board_content")
    private String content; //내용
    
    @JsonManagedReference
    @OneToMany(mappedBy = "board", fetch=FetchType.LAZY, cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<BoardImg> boardImgs = new ArrayList<>();
    
    @ManyToOne
    @JoinColumn(name="user_id")
    private LibUser libUser;
    
    public void updateBoard(BoardFormDto boardFormDto) {
    	this.title = boardFormDto.getTitle();
    	this.content = boardFormDto.getContent();
    }
}
