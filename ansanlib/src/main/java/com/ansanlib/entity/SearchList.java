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
@Table(name="SearchList")
public class SearchList extends BaseEntity {
	 @Id
     @Column(name="search_id")
     @GeneratedValue(strategy= GenerationType.IDENTITY)
     private Long id;
	 
	 private String searchContent;
	 
	 private LocalDateTime search_date;

}
