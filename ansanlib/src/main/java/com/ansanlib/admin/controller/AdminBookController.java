package com.ansanlib.admin.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.admin.service.AdminBookService;
import com.ansanlib.book.dto.BookDto;
import com.ansanlib.entity.Book;
import com.ansanlib.entity.RequestBook;
import com.ansanlib.response.CommonListResponse;

@RestController
@RequestMapping("/api/admin/book")
public class AdminBookController {

	@Autowired
	private AdminBookService adminBookService;

	@PostMapping("/new")
	public ResponseEntity<BookDto> createBook(@RequestPart("bookDto") BookDto bookDto,
			@RequestPart(value = "file", required = false) MultipartFile file) {
		try {
			BookDto savedBook = adminBookService.saveBook(bookDto, file);
			return ResponseEntity.ok(savedBook);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/list")
	public List<Book> getBooks() {
		return adminBookService.getAllBooks();
	}

	@GetMapping("/request")
	public ResponseEntity<CommonListResponse<List<RequestBook>>> getAllRequestBooks() {
		List<RequestBook> requestBooks = adminBookService.getAllRequestBooks();

		return ResponseEntity.ok().body(new CommonListResponse<>(requestBooks.size(), requestBooks));
	}

	// 데이터삭제
	// 도서 등록 후, 예약이나 대출이 걸려있으면 삭제 불가
	// 깨꿋한 상태(?)여야 삭제가눙~
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteBook(@PathVariable Long id) {
		try {
			adminBookService.deleteBookById(id);
			return ResponseEntity.ok("Book deleted successfully");

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete book");
		}
	}

}