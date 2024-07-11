package com.ansanlib.book.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.book.dto.BookDto;
import com.ansanlib.book.dto.BookFormDto;
import com.ansanlib.book.dto.BookImgDto;
import com.ansanlib.book.dto.BookImgSimpleDto;
import com.ansanlib.book.dto.BookSearchCondition;
import com.ansanlib.book.repository.BookImgRepository;
import com.ansanlib.book.repository.BookRepository;
import com.ansanlib.book.repository.LibUserRepository;
import com.ansanlib.constant.BookStatus;
import com.ansanlib.entity.Book;
import com.ansanlib.entity.BookImg;
import com.ansanlib.entity.LibUser;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BookService {

	private final BookRepository bookRepository;
	private final LibUserRepository libUserRepository;
	private final BookImgRepository bookImgRepository;
	private final BookImgService bookImgService;
	
	// 새로운 책 등록
    public Long saveBook(BookFormDto bookFormDto, MultipartFile bookImgFileList, String email) throws Exception{
        LibUser finduser = libUserRepository.findByEmail(email);
        Book book = Book.builder()
                .title(bookFormDto.getTitle())
                .isbn(bookFormDto.getIsbn())
                .author(bookFormDto.getAuthor())
                .publisher(bookFormDto.getPublisher())
                .pub_date(bookFormDto.getPub_date())
                .bookDetail(bookFormDto.getBookDetail())
                .location(bookFormDto.getLocation())
                .count(0)
                .libUser(finduser)
                .status(BookStatus.AVAILABLE)
                .build();

        bookRepository.save(book);

        //이미지 등록
        BookImg bookImg = new BookImg();
        bookImg.setBook(book);
        bookImgService.saveBookImg(bookImg, bookImgFileList);

        return book.getId();
    }
	
	// 검색 v1
	// 주어진 키워드를 포함하는 책 이름을 가진 책 목록을 페이지네이션하여 변환
    @Transactional(readOnly = true)
    public Page<Book> searchBookList(String keyword, Pageable pageable) {
        return bookRepository.findByTitleContaining(keyword, pageable);
    }

    // 검색 v2
    
    @Transactional(readOnly = true)
    public List<Book> searchBookCondition(BookSearchCondition condition){
        return bookRepository.searchBook(condition);
    }

    // 검색 v3
    @Transactional(readOnly = true)
    public Page<Book> searchBookConditionPage(BookSearchCondition condition, Pageable pageable){
        return bookRepository.searchBookPageSimple(condition, pageable);
    }
    
	// 도서 id 기반 검색 -> BookDto 변환
    @Transactional(readOnly = true)
    public BookDto findBookById(Long id){
        Book book = bookRepository.findById(id).get();
        String detail = book.getBookDetail().replace("\r\n","<br>");

        BookDto bookDto = BookDto.builder()
                .title(book.getTitle())
                .author(book.getAuthor())
                .publisher(book.getPublisher())
                .pub_date(book.getPub_date())
                .isbn(book.getIsbn())
                .status(book.getStatus().toString())
                .location(book.getLocation())
                .bookImg(new BookImgSimpleDto(book.getBookImg().getImgUrl()))
                .bookDetail(detail)
                .build();

        return bookDto;
    }

    // 도서 isbn 기반 조회
    @Transactional(readOnly = true)
    public List<Book> findBookbyISBN(String isbn){
        return bookRepository.findByIsbn(isbn);
    }
    
    @Transactional(readOnly = true)
    public BookFormDto getBookDtl(Long bookId){
        BookImg bookImgList = bookImgRepository.findById(bookId).get();
        BookImgDto bookImgDtoList = BookImgDto.of(bookImgList);

        Book book = bookRepository.findById(bookId)
                .orElseThrow(EntityNotFoundException::new);
        BookFormDto bookFormDto = BookFormDto.of(book);
        bookFormDto.setBookImgDto(bookImgDtoList);
        return bookFormDto;
    }

    public Long updateBook(BookFormDto bookFormDto, List<MultipartFile> bookImgFileList) throws Exception{
        //상품 수정
        Book book = bookRepository.findById(bookFormDto.getId())
                .orElseThrow(EntityNotFoundException::new);
        book.updateBook(bookFormDto);
        Long bookImgId = bookFormDto.getBookImgId();

        //이미지 등록
        for(int i=0;i<bookImgFileList.size();i++){
            bookImgService.updateBookImg(bookImgId, bookImgFileList.get(i));
        }

        return book.getId();
    }
    
 // 책 이름 키워드로 도서 검색(json 반환)
    public String findByNameContainingRetrunJson(String keyword){
        List<Book> bookList = bookRepository.findByTitleContaining(keyword);

        JsonObject jo = new JsonObject();
        if(bookList.size()>0) jo.addProperty("status", "YES");
        else jo.addProperty("status", "NO");

        JsonArray ja = new JsonArray();
        for (Book book : bookList) {
            JsonObject jObj = new JsonObject();
            jObj.addProperty("id", book.getId());
            jObj.addProperty("title", book.getTitle());
            jObj.addProperty("isbn", book.getIsbn());
            jObj.addProperty("author", book.getAuthor());
            jObj.addProperty("publisher", book.getPublisher());
            jObj.addProperty("category_code", book.getCategory_code());
            ja.add(jObj);
        }
        jo.add("books", ja);

        return jo.toString();
    }
    
    // isbn 도서 소장중인 개수
    public int getCountByIsbn(String isbn){
        return bookRepository.countByIsbn(isbn);
    }
    
    // 대출량으로 도서 검색
    public List<BookDto> getAllBestsellers() {
    	return bookRepository.findTopBestsellers().stream()
    			.map(book -> {
    				BookDto dto = new BookDto();
    				dto.setId(book.getId());
    				dto.setTitle(book.getTitle());
    				dto.setAuthor(book.getAuthor());
    				dto.setGenre(book.getGenre());
    				dto.setSales(book.getSales());
    				dto.setPub_date(book.getPub_date());
    				return dto;
    			})
    			.collect(Collectors.toList());
    }
    
    
    
}
