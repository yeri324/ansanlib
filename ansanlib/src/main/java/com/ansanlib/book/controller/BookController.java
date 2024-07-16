package com.ansanlib.book.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.book.bookapi.dto.BookApiResultDto;
import com.ansanlib.book.bookapi.paging.Criteria;
import com.ansanlib.book.bookapi.paging.PageMaker;
import com.ansanlib.book.bookapi.service.BookApiService;
import com.ansanlib.book.dto.BookDto;
import com.ansanlib.book.dto.BookListDto;
import com.ansanlib.book.dto.BookSearchCondition;
import com.ansanlib.book.service.BookService;
import com.ansanlib.entity.Book;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class BookController {
	
	private final ModelMapper modelMapper;
	private final BookService bookService;
	private final BookApiService bookApiService;
	
	// 검색
	@GetMapping("/api/book/search")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> searchBookList(
	        @RequestParam(defaultValue = "") String title,
	        @RequestParam(defaultValue = "") String isbn,
	        @RequestParam(defaultValue = "") String author,
	        @RequestParam(defaultValue = "") String publisher,
	        @RequestParam(defaultValue = "") String pub_date,
	        @RequestParam(defaultValue = "") String category_code,
	        @PageableDefault(sort = "title", direction = Sort.Direction.ASC) Pageable pageable) {
	    Page<Book> bookList = bookService.searchBookPageSimple(
	            new BookSearchCondition(title, isbn, author, publisher, pub_date, category_code), pageable);

	    Map<String, Object> response = new HashMap<>();
	    response.put("bookList", bookList.getContent());
	    response.put("previous", pageable.previousOrFirst().getPageNumber());
	    response.put("next", pageable.next().getPageNumber());
	    response.put("hasNext", bookList.hasNext());
	    response.put("hasPrev", bookList.hasPrevious());
	    response.put("title", title);
	    response.put("isbn", isbn);
	    response.put("author", author);
	    response.put("publisher", publisher);
	    response.put("pub_date", pub_date);
	    response.put("category_code", category_code);

	    return ResponseEntity.ok(response);
	}
	
	// 도서 상세 정보
	@GetMapping("/api/book/detail/{id}")
	public ResponseEntity<BookDto> bookDetail(@PathVariable Long id) {
		BookDto book = bookService.findBookById(id);

		List<Book> bookListTemp = bookService.findBookbyISBN(book.getIsbn());

		// ModelMapper이용해 List<Entity> -> List<Dto>
		List<BookListDto> bookList = bookListTemp.stream()
				.map(books -> modelMapper.map(books, BookListDto.class))
				.collect(Collectors.toList());

		book.setRelatedBooks(bookList);

		return ResponseEntity.ok(book);
	}
	
	// 책 자동 완성 기능
	@GetMapping("/api/book/autocomplete")
    public List<String> autocomplete(@RequestParam String query) {
        // BookService에서 자동 완성 결과를 가져오는 메서드 호출
        List<Book> books = bookService.findBooksByTitle(query);
        // 책 제목 목록을 반환
        return books.stream()
                .map(Book::getTitle)
                .collect(Collectors.toList());
    }
	
	// 네이버 API BOOK 검색 결과 v2 - 페이징
	private static final Logger logger = LoggerFactory.getLogger(BookController.class);

	@GetMapping("/api/bookapi/search")
	@ResponseBody
	public Map<String, Object> searchBookAPIList(@RequestParam(defaultValue = "") String keyword,
	                                             @RequestParam(defaultValue = "title") String sortBy,
	                                             @RequestParam(defaultValue = "asc") String sortOrder,
	                                             Criteria cri) {
	    logger.info("Received request: keyword={}, sortBy={}, sortOrder={}", keyword, sortBy, sortOrder);

	    PageMaker pageMaker = new PageMaker();
	    pageMaker.setCri(cri);
	    BookApiResultDto books = bookApiService.searchBookNaverAPI(keyword, sortBy, sortOrder, cri);
	    pageMaker.setTotalCount(books.getTotal());

	    Map<String, Object> response = new HashMap<>();
	    response.put("pageMaker", pageMaker);
	    response.put("keyword", keyword);
	    response.put("books", books);

	    return response;
	}
}