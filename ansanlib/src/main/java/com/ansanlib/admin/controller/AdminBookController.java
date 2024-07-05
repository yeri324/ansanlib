//package com.ansanlib.admin.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.ansanlib.admin.dto.AdminBookDto;
//import com.ansanlib.admin.service.AdminBookService;
//import com.ansanlib.entity.Book;
//
//@RestController
//@RequestMapping("/api/admin/book")
//public class AdminBookController {
//
//    @Autowired
//    private AdminBookService adminBookService;
//
//    @PostMapping("/new")
//    public ResponseEntity<Book> addBook(@RequestBody AdminBookDto adminBookDto) {
//        Book savedBook = adminBookService.saveBook(adminBookDto);
//        return ResponseEntity.ok(savedBook);
//    }
//}
