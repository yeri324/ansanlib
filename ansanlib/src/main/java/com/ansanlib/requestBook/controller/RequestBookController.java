package com.ansanlib.requestBook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.ansanlib.requestBook.service.RequestBookService;

@RestController
@RequestMapping("/api/requestbook")
public class RequestBookController {
	@Autowired
	private RequestBookService requestBookService;
	
	@PostMapping
	public ResponseEntity<RequestBook> createReqeustBook(@RequestBody CreateRequestBookDto createRequestBookDto){
		try {
			RequestBook savedRequestBook = requestBookService.createRequestBook(createRequestBookDto);
			return ResponseEntity.ok(savedRequestBook);
		}catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(null);
		}
	}

    @GetMapping("get/by-user/{userId}")
    public ResponseEntity<List<RequestBookDto>> getRequestBooksByUser(@PathVariable Long userId) {
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
            return ResponseEntity.status(500).build();
        }
    }
}