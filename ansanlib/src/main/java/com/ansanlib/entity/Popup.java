package com.ansanlib.entity;

import java.time.LocalDate;

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

    private LocalDate startDate;

    private LocalDate endDate;

    private PopupStatus status;

}