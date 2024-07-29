package com.ansanlib.admin.controller;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
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
import com.ansanlib.book.service.FileService;
import com.ansanlib.entity.Book;
import com.ansanlib.entity.LoanStatus;
import com.ansanlib.entity.RecBoard;
import com.ansanlib.entity.RequestBook;
import com.ansanlib.response.CommonListResponse;
@RestController
@RequestMapping("/api/admin/book")
public class AdminBookController {

	@Autowired
	private AdminBookService adminBookService;
	 @Autowired
	    private FileService fileService; // fileService 주입
	
//도서-도서관 중복확인
	   @GetMapping("/exists")
	    public ResponseEntity<Boolean> checkBookExists(@RequestParam String isbn, @RequestParam String libName) {
	        boolean exists = adminBookService.checkBookExists(isbn, libName);
	        return ResponseEntity.ok(exists);
	    }
	
	
	
	//추추추가
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
		
	
	

	
	//bookList조회
	@GetMapping("/list")
	public List<Book> getBooks() {
		return adminBookService.getAllBooks();
	}

	//히망도서 불러와~
	@GetMapping("/request")
	public ResponseEntity<CommonListResponse<List<RequestBook>>> getAllRequestBooks() {
		List<RequestBook> requestBooks = adminBookService.getAllRequestBooks();

		return ResponseEntity.ok().body(new CommonListResponse<>(requestBooks.size(), requestBooks));
	}

	
	 @PostMapping("/{bookId}/addLibrary")
	    public ResponseEntity<?> addLibrary(@PathVariable Long bookId, @RequestBody BookDto bookDto) {
	        try {
	            adminBookService.addLib(bookId, bookDto);
	            return ResponseEntity.ok().build();
	        } catch (Exception e) {
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding library entry: " + e.getMessage());
	        }
	    }

	//책 권수 수정
	 @PutMapping("/update")
	    public ResponseEntity<String> updateLibrary(
	            @RequestParam String libName, 
	            @RequestParam String title, 
	            @RequestParam int count) {
	        try {
	            adminBookService.updateBookCountByLibNameAndTitle(libName, title, count);
	            return new ResponseEntity<>("Library updated successfully", HttpStatus.OK);
	        } catch (IllegalArgumentException e) {
	            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
	        }
	    }
		
		
			
//		//삭제
	 @DeleteMapping("/delete")
	 public ResponseEntity<String> deleteBook(@RequestParam String libName, @RequestParam String title) {
	        try {
	            adminBookService.deleteBookByLibNameAndTitle(libName, title);
	            return new ResponseEntity<>("Book deleted successfully", HttpStatus.OK);
	        } catch (IllegalArgumentException e) {
	            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
	        } catch (Exception e) {
	            return new ResponseEntity<>("Error deleting book", HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	 


	 
	 
	 
	 
	 //추춴도서목록 불러오기
	 @GetMapping("/rec")
	 public List<RecBoard> getRecBoards() {
	        return adminBookService.getRecBoards();
	    }
	 
	 
	 //대출도서 불러오기
	 @GetMapping("/loanlist")
	   public ResponseEntity<List<LoanStatus>> getAllLoans() {
	        List<LoanStatus> loans = adminBookService.getAllLoanStatuses();
	        return ResponseEntity.ok(loans);
	    }
	 
	 
	 

	 

}
