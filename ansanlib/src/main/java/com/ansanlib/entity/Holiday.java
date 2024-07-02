package com.ansanlib.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity


@Table(name="holiday")

public class Holiday extends BaseEntity {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.SEQUENCE)
	    @Column(name = "holiday_num")
	    private Long id;
	
	 @ManyToOne
	    @JoinColumn(name = "lib_num")
	    private Library library;
	
	private LocalDate holiday; //휴관일
	
	private String lib_name;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Library getLibrary() {
		return library;
	}
	public void setLibrary(Library library) {
		this.library = library;
	}
	public LocalDate getHoliday() {
		return holiday;
	}
	public void setHoliday(LocalDate holiday) {
		this.holiday = holiday;
	}
	public String getLib_name() {
		return lib_name;
	}
	public void setLib_name(String lib_name) {
		this.lib_name = lib_name;
	}
	

	}
	
		
	
	
	
	
