package com.ansanlib.book.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.book.service.BookInterestService;
import com.ansanlib.entity.BookInterest;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/book/interest")
public class BookInterestController {
    private final BookInterestService bookInterestService;

    // 관심도서에 추가
    @PostMapping("/{id}")
    public ResponseEntity<Void> insertBookInterest(@PathVariable Long id, Principal principal){
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            bookInterestService.insertBookInterest(principal.getName(), id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 관심도서에서 삭제하기
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookInterest(@PathVariable Long id, Principal principal){
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            bookInterestService.deleteBookInterest(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 관심도서 리스트 조회
    @GetMapping("/list")
    public ResponseEntity<List<BookInterest>> getBookInterestList(Principal principal){
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            List<BookInterest> bookInterestList = bookInterestService.getBookInterestList(principal.getName());
            return ResponseEntity.ok(bookInterestList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
