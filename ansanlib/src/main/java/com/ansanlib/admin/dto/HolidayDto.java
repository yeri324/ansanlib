package com.ansanlib.admin.dto;

import java.time.LocalDate;

public class HolidayDto {

    private Long id;
    private Long library;
    private LocalDate holiday;
    private String lib_name;

    // Constructors

    public HolidayDto() {
    }

    public HolidayDto(Long id, Long library, LocalDate holiday, String libraryName) {
        this.id = id;
        this.library = library;
        this.holiday = holiday;
        this.lib_name = lib_name;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getLibrary() {
        return library;
    }

    public void setLibrary(Long library) {
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
