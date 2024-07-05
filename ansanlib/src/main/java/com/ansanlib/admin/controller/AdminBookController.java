package com.ansanlib.admin.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.admin.service.AdminBookService;
import com.ansanlib.book.dto.BookDto;
import com.ansanlib.entity.Book;

@RestController
@RequestMapping("/api/admin/book")
public class AdminBookController {

    @Autowired
    private AdminBookService adminBookService;

 

    @PostMapping("/new")
    public ResponseEntity<Book> addBook(@RequestPart("book") BookDto bookDto, @RequestPart("file") MultipartFile file) throws IOException {
        Book savedBook = adminBookService.saveBook(bookDto, file);
        return ResponseEntity.ok(savedBook);
    }
}
