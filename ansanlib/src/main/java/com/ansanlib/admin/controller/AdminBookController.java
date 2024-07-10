package com.ansanlib.admin.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.admin.service.AdminBookService;
import com.ansanlib.book.dto.BookDto;
import com.ansanlib.entity.RequestBook;
import com.ansanlib.response.CommonListResponse;

@RestController
@RequestMapping("/api/admin/book")
public class AdminBookController {

    @Autowired
    private AdminBookService adminBookService;

 

    @PostMapping("/new")
    public ResponseEntity<BookDto> addBook(@RequestPart("book") BookDto bookDto, @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        BookDto savedBook = adminBookService.saveBook(bookDto, file);
        return ResponseEntity.ok(savedBook);
    }
    
    
    
    @GetMapping("/request")
    public ResponseEntity<CommonListResponse<List<RequestBook>>> getAllRequestBooks() {
        List<RequestBook> requestBooks = adminBookService.getAllRequestBooks();
       
        return ResponseEntity.ok().body(new CommonListResponse<>(requestBooks.size(), requestBooks));
    }
    

}
