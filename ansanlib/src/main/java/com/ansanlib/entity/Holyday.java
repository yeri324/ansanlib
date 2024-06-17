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
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name="holyday")
@ToString
public class Holyday extends BaseEntity {
	@Id
	@Column(name="holyday_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	
	private String lib_num;
	
	private LocalDateTime holyday;
	
	

}
