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
@Table(name="lib_board")
public class Board extends BaseEntity{

    @Id
    @Column(name="board_num")
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    
    @Column(name="board_title")
    private String title;
    
    @Column(name="board_content")
    private String content;
    
    @Column(name="board_file")
    private String file;
}
