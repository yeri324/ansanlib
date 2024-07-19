package com.ansanlib.book.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
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

	// 관심도서에 추가
	@PostMapping("/{id}")
	public ResponseEntity<?> insertBookInterest(@PathVariable Long id, Principal principal) {
		try {
			bookInterestService.insertBookInterest(principal.getName(), id);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}

	// 관심도서에서 삭제하기
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteBookInterest(@PathVariable Long id) {
		try {
			bookInterestService.deleteBookInterest(id);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}

	// 관심도서 리스트 가져오기
	@GetMapping("/list")
	public ResponseEntity<?> getBookInterestList(Principal principal) {
		try {
			List<BookInterestDto> bookInterestList = bookInterestService.getBookInterestList(principal.getName());
			return ResponseEntity.ok(bookInterestList);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}
}