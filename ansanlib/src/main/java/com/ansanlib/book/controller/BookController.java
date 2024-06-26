package com.ansanlib.book.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.book.dto.BookDto;
import com.ansanlib.book.dto.BookFormDto;
import com.ansanlib.book.dto.BookListDto;
import com.ansanlib.book.dto.BookSearchCondition;
import com.ansanlib.book.service.BookService;
import com.ansanlib.entity.Book;

import jakarta.validation.Valid;

@Controller
@RequestMapping
public class BookController {

	@Autowired
	private BookService bookService;
	
	@Autowired
	private ModelMapper modelMapper;
	
	// 새로운 책 등록 폼
    @GetMapping("/admin/book/new")
    public String bookForm(Model model){
        model.addAttribute("bookFormDto", new BookFormDto());
        return "admin/addBookForm";
    }

    // 새로운 책 등록
    @PostMapping(value = "/admin/book/new")
    public String addNewBook(@Valid BookFormDto bookFormDto, BindingResult bindingResult,
                             Model model, @RequestParam("bookImgFile") MultipartFile bookImgFile,
                             Principal principal){

        if(bindingResult.hasErrors()){
            return "admin/addBookForm";
        }

        if(bookImgFile.isEmpty()){
            model.addAttribute("errorMessage", "이미지는 필수 입력 값 입니다.");
            return "admin/addBookForm";
        }

        try {
            String email = principal.getName();
            bookService.saveBook(bookFormDto, bookImgFile, email);
        } catch (Exception e){
            model.addAttribute("errorMessage", "상품 등록 중 에러가 발생하였습니다.");
            return "admin/addBookForm";
        }

        return "redirect:/";
    }
	
	@GetMapping("/api/book/search")
	public String searchBookList() {
		return "search/searchBook";
	}
	
	// 도서 검색 - 통합검색, 동적쿼리, 페이징처리
	// main/book/search/result
	@GetMapping("/api/book/searchList")
    public String searchbookList(@RequestParam(defaultValue = "") String keyword,
                           @RequestParam(defaultValue = "") String isbn,
                           @RequestParam(defaultValue = "") String author,
                           @RequestParam(defaultValue = "") String publisher,
                           @RequestParam(defaultValue = "") LocalDateTime pub_date,
                           @RequestParam(defaultValue = "") String category_code,
                           @PageableDefault(sort = "title", direction = Sort.Direction.ASC) Pageable pageable,
                           Model model){
        Page<Book> bookList = bookService.searchBookConditionPage(new BookSearchCondition(keyword,isbn,author,publisher,pub_date,category_code), pageable);

        model.addAttribute("bookList", bookList);
        model.addAttribute("previous", pageable.previousOrFirst().getPageNumber());
        model.addAttribute("next", pageable.next().getPageNumber());
        model.addAttribute("hasNext", bookList.hasNext());
        model.addAttribute("hasPrev", bookList.hasPrevious());

        model.addAttribute("keyword", keyword);
        model.addAttribute("isbn",isbn);
        model.addAttribute("author",author);
        model.addAttribute("publisher",publisher);
        model.addAttribute("pub_date",pub_date);
        model.addAttribute("category_code",category_code);

        return "search/searchBookList";
    }
	
	// 도서 상세 정보
    @GetMapping("/api/book/detail/{id}")
    public String bookDetail(@PathVariable Long id, Model model){
        BookDto book = bookService.findBookById(id);

        List<Book> bookList_temp= bookService.findBookbyISBN(book.getIsbn());

        
		// ModelMapper이용해 List<Entity> -> List<Dto>
        List<BookListDto> bookList = bookList_temp.stream()
                .map(books->modelMapper.map(books, BookListDto.class))
                .collect(Collectors.toList());


        model.addAttribute("book", book);
        model.addAttribute("bookList", bookList);

        return "search/bookDetail";
    }
}
