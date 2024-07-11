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
	private static final Logger logger = LoggerFactory.getLogger(BookController.class);
	
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
	
}
//	// 새로운 책 등록 폼 (이 부분은 필요에 따라 수정)
//	@GetMapping("/admin/book/new")
//	public String bookForm(Model model) {
//		model.addAttribute("bookFormDto", new BookFormDto());
//		return "admin/addBookForm";
//	}
//
//	// 새로운 책 등록
//	@PostMapping("/admin/book/new")
//	public String addNewBook(@Valid BookFormDto bookFormDto, BindingResult bindingResult, Model model,
//			@RequestParam("bookImgFile") MultipartFile bookImgFile, Principal principal) {
//
//		if (bindingResult.hasErrors()) {
//			return "admin/addBookForm";
//		}
//
//		if (bookImgFile.isEmpty()) {
//			model.addAttribute("errorMessage", "이미지는 필수 입력 값 입니다.");
//			return "admin/addBookForm";
//		}
//
//		try {
//			String email = principal.getName();
//			bookService.saveBook(bookFormDto, bookImgFile, email);
//		} catch (Exception e) {
//			model.addAttribute("errorMessage", "상품 등록 중 에러가 발생하였습니다.");
//			return "admin/addBookForm";
//		}
//
//		return "redirect:/";
//	}
//	
//	
//	
