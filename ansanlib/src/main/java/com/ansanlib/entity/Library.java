package com.ansanlib.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Library extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "library_id")
    private Long id;


    @Column(unique = true)
    private String libNum;
    
    private String libName;

    private String address;

    private String phone;

    private String web_address;

    @OneToMany(mappedBy = "library")
    private List<Holiday> holidays = new ArrayList<>();


    
}