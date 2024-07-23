package com.ansanlib.book.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.book.dto.BookInterestDto;
import com.ansanlib.book.service.BookInterestService;
import com.ansanlib.entity.BookInterest;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/book/interest")
@RequiredArgsConstructor
public class BookInterestController {

    private final BookInterestService bookInterestService;

    @GetMapping("/interests/{userId}")
    public ResponseEntity<Map<String, Object>> getBookInterestList(@PathVariable Long userId,
                                                                   @RequestParam(defaultValue = "0") int page,
                                                                   @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<BookInterest> bookInterestsPage = bookInterestService.findBookInterestsByUserId(userId, pageable);

        List<BookInterestDto> dtos = bookInterestsPage.getContent().stream()
                .map(bookInterest -> new BookInterestDto(
                        bookInterest.getId(),
                        bookInterest.getBook(),
                        bookInterest.getRegTime()
                ))
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("bookInterests", dtos);
        response.put("currentPage", bookInterestsPage.getNumber());
        response.put("totalItems", bookInterestsPage.getTotalElements());
        response.put("totalPages", bookInterestsPage.getTotalPages());

        return ResponseEntity.ok(response);
    }


    @PostMapping("/{userId}/{bookId}")
    public ResponseEntity<Void> insertBookInterest(@PathVariable Long userId, @PathVariable Long bookId) {
        bookInterestService.insertBookInterest(userId, bookId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookInterest(@PathVariable Long id) {
        bookInterestService.deleteBookInterest(id);
        return ResponseEntity.ok().build();
    }
}
