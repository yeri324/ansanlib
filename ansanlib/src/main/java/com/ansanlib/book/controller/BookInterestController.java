package com.ansanlib.book.controller;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.ansanlib.book.service.BookInterestService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class BookInterestController {
    private final BookInterestService bookInterestService;

    // 관심도서에 추가
    @GetMapping("/book/interest/{id}")
    public String insertBookInterest(@PathVariable Long id, Principal principal){
        bookInterestService.insertBookInterest(principal.getName(), id);

        return "book/searchBookList";
    }

    // 관심도서에서 삭제하기
    @GetMapping("/book/interest/delete/{id}")
    public String deleteBookInterest(@PathVariable Long id){
        bookInterestService.deleteBookInterest(id);

        return "redirect:/member/mypage/interest";
    }
}
