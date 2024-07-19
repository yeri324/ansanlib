package com.ansanlib.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

	
//도서-도서관 중복확인
	   @GetMapping("/exists")
	    public ResponseEntity<Boolean> checkBookExists(@RequestParam String isbn, @RequestParam String libName) {
	        boolean exists = adminBookService.checkBookExists(isbn, libName);
	        return ResponseEntity.ok(exists);
	    }
	
	
	
	
	   @PostMapping("/new")
	    public ResponseEntity<?> createBook(@RequestPart("bookDto") BookDto bookDto,
	                                        @RequestPart(value = "file", required = false) MultipartFile file) {
	        boolean bookExists = adminBookService.checkBookExists(bookDto.getIsbn(), bookDto.getLibName());
	        if (bookExists) {
	            return ResponseEntity.badRequest().body("해당 도서관에 소장 중입니다");
	        }

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

	
	
	 @PutMapping("/{id}")
	 public ResponseEntity<Book> updateBookCount(@PathVariable Long id, @RequestBody BookDto bookDto) {
	        Book updatedBook = adminBookService.updateBookCount(id, bookDto);
	        return ResponseEntity.ok(updatedBook);
	    }
	
	
	
	
	//삭제
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
