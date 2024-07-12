package com.ansanlib.requestBook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.entity.LibUser;
import com.ansanlib.entity.RequestBook;
import com.ansanlib.requestBook.dto.CreateRequestBookDto;
import com.ansanlib.requestBook.dto.RequestBookDto;
import com.ansanlib.requestBook.exception.CreateRequestBookException;
import com.ansanlib.requestBook.service.RequestBookService;
import com.ansanlib.security.user.CustomUser;
import com.ansanlib.user.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/requestbook")
public class RequestBookController {
	@Autowired
	private RequestBookService requestBookService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/create")
	public ResponseEntity<?> createReqeustBook(@AuthenticationPrincipal CustomUser user, @RequestBody CreateRequestBookDto createRequestBookDto){
		if(user == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Logged in.");
		}
		
		long userId = user.getUser().getUserId();
		try {
			RequestBook savedRequestBook = requestBookService.createRequestBook(userId, createRequestBookDto);
			RequestBookDto savedRequestBookDto = new RequestBookDto(savedRequestBook);
			return ResponseEntity.ok(savedRequestBookDto);
		}catch (CreateRequestBookException e1) {
			return ResponseEntity.badRequest().body(e1.getMessage()); 
		}catch (RuntimeException e2) {
	        e2.printStackTrace(); // 서버 로그에 예외 출력
			return ResponseEntity.badRequest().body("서버 내부 오류");
		}
	}

	@GetMapping("/get")
	public ResponseEntity<?> getRequestBooksByUser(@AuthenticationPrincipal CustomUser user,
			HttpServletRequest httpRequest) {
		if(user == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Logged in.");
		}
		long userId = user.getUser().getUserId();
		List<RequestBook> requestBooks = requestBookService.getRequestBooksByUser(userId);
		List<RequestBookDto> requestBooksDto = requestBooks.stream().map(RequestBookDto::new).toList();
		if(requestBooksDto.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(requestBooksDto);
	}
	
//    @GetMapping("get/by-user/{userId}")
//    public ResponseEntity<List<RequestBookDto>> getRequestBooksByUser(@PathVariable Long userId, HttpServletRequest httpRequest) {
//        List<RequestBook> requestBooks = requestBookService.getRequestBooksByUser(userId);
//        List<RequestBookDto> requestsBooksDto = requestBooks.stream().map(RequestBookDto::new).toList();
//        if (requestBooks.isEmpty()) {
//            return ResponseEntity.notFound().build();
//        } else {
//        	return ResponseEntity.ok(requestsBooksDto);
//        }
//    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteRequestBook(@AuthenticationPrincipal CustomUser user, @PathVariable Long id){
    	if(user == null) {
    		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Logged in.");
    	}
    	long userId =user.getUser().getUserId();
    	try {
    		requestBookService.deleteRequestBookByUserId(userId);
    		return ResponseEntity.noContent().build();
    	} catch (Exception e) {
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    	}
    }
    
//    public ResponseEntity<Void> deleteRequestBook(@PathVariable Long id) {
//        try {
//            requestBookService.deleteRequestBook(id);
//            return ResponseEntity.noContent().build();
//        } catch (Exception e) {
//        	e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
    @GetMapping("/get_name")
	public ResponseEntity<?> getName(@AuthenticationPrincipal CustomUser user) {
		if(user == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Logged in.");
		}
		long userId = user.getUser().getUserId();
		try {
			LibUser fullLibUser = userService.select(userId);
			String realName = fullLibUser.getName();
			return ResponseEntity.ok(realName);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}