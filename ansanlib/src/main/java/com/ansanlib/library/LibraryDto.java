package com.ansanlib.library;

public class LibraryDto {

    private Long id;
    private String libName;
    private String address;
    private String phone;
    private String webAddress;

    // Constructors

    public LibraryDto() {
    }

    public LibraryDto(Long id, String libName, String address, String phone, String webAddress) {
        this.id = id;
        this.libName = libName;
        this.address = address;
        this.phone = phone;
        this.webAddress = webAddress;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibName() {
        return libName;
    }

    public void setLibName(String libName) {
        this.libName = libName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getWebAddress() {
        return webAddress;
    }

    public void setWebAddress(String webAddress) {
        this.webAddress = webAddress;
    }
}
