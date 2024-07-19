package com.ansanlib.book.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.book.dto.BookInterestDto;
import com.ansanlib.book.service.BookInterestService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/book/interest")
public class BookInterestController {

    private final BookInterestService bookInterestService;

    @GetMapping("/list")
    public List<BookInterestDto> getBookInterestList(Principal principal) {
        return bookInterestService.getBookInterestList(principal.getName());
    }

    @PostMapping("/{id}")
    public void insertBookInterest(@PathVariable Long id, Principal principal) {
        bookInterestService.insertBookInterest(principal.getName(), id);
    }

    @DeleteMapping("/{id}")
    public void deleteBookInterest(@PathVariable Long id) {
        bookInterestService.deleteBookInterest(id);
    }
}