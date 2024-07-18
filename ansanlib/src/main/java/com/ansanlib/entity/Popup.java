package com.ansanlib.entity;

import java.time.LocalDate;

import com.ansanlib.admin.dto.AdminPopupDto;
import com.ansanlib.constant.PopupStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Popup extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    private String imgUrl;
    
    private String imgName;

    private LocalDate startDate;

    private LocalDate endDate;

    private PopupStatus status;
    
	private int xLoc;
	private int yLoc;

    public Popup bind(AdminPopupDto popupDto) {
    	this.setId(popupDto.getId());
    	this.setTitle(popupDto.getTitle());
    	this.setStartDate(popupDto.getStartDate());
    	this.setEndDate(popupDto.getEndDate());
    	this.setXLoc(popupDto.getXLoc());
    	this.setYLoc(popupDto.getYLoc());
    	
    	if("display".equalsIgnoreCase(popupDto.getStatus())) this.setStatus(status.DISPLAY);
    	else this.setStatus(status.HIDDEN);
    	
		return this;
    }
   
}