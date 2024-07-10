package com.ansanlib.requestBook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.entity.RequestBook;
import com.ansanlib.requestBook.dto.CreateRequestBookDto;
import com.ansanlib.requestBook.dto.RequestBookDto;
import com.ansanlib.requestBook.exception.CreateRequestBookException;
import com.ansanlib.requestBook.service.RequestBookService;
import com.ansanlib.user.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/requestbook")
public class RequestBookController {
	@Autowired
	private RequestBookService requestBookService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping
	public ResponseEntity<?> createReqeustBook(@RequestBody CreateRequestBookDto createRequestBookDto){
		try {
			RequestBook savedRequestBook = requestBookService.createRequestBook(createRequestBookDto);
			RequestBookDto savedRequestBookDto = new RequestBookDto(savedRequestBook);
			return ResponseEntity.ok(savedRequestBook);
		}catch (CreateRequestBookException e1) {
			return ResponseEntity.badRequest().body(e1.getMessage()); 
		}catch (RuntimeException e2) {
			return ResponseEntity.badRequest().body("아이디가 존재하지 않습니다");
		}
	}

    @GetMapping("get/by-user/{userId}")
    public ResponseEntity<List<RequestBookDto>> getRequestBooksByUser(@PathVariable Long userId, HttpServletRequest httpRequest) {
//    	if (httpRequest.getSession().getAttribute("userId") == null || !userService.existsById(userId)) {
//    	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//    	    }
        List<RequestBook> requestBooks = requestBookService.getRequestBooksByUser(userId);
        List<RequestBookDto> requestsBooksDto = requestBooks.stream().map(RequestBookDto::new).toList();
        if (requestBooks.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
        	return ResponseEntity.ok(requestsBooksDto);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequestBook(@PathVariable Long id) {
        try {
            requestBookService.deleteRequestBook(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
        	e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}