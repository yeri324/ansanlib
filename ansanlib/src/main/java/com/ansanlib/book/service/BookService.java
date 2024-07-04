package com.ansanlib.book.service;

import java.util.List;
import java.util.Optional;

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
import com.ansanlib.book.repository.BookRepositoryCustom;
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
	private final BookRepositoryCustom bookRepositoryCustom;
	
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
	
	
    // 검색
    @Transactional(readOnly = true)
    public Page<Book> searchBookPageSimple(BookSearchCondition condition, Pageable pageable) {
        return bookRepositoryCustom.searchBookPageSimple(condition, pageable);
    }

    // 상세정보
	// 도서 id 기반 검색 -> BookDto 변환
    @Transactional(readOnly = true)
    public BookDto findBookById(Long id) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        if (!optionalBook.isPresent()) {
            throw new RuntimeException("Book not found with id: " + id); // 예외 처리
        }

        Book book = optionalBook.get();
        String detail = book.getBookDetail().replace("\r\n", "<br>");

        BookImgSimpleDto bookImgSimpleDto = null;
        if (book.getBookImg() != null) {
            bookImgSimpleDto = new BookImgSimpleDto(book.getBookImg().getImgUrl());
        }

        BookDto bookDto = BookDto.builder()
                .title(book.getTitle())
                .author(book.getAuthor())
                .publisher(book.getPublisher())
                .pub_date(book.getPub_date())
                .isbn(book.getIsbn())
                .status(book.getStatus())
                .location(book.getLocation())
                .category_code(book.getCategory_code())
                .bookImg(bookImgSimpleDto)
                .bookDetail(detail)
                .build();

        return bookDto;
    }

    // 도서 isbn 기반 조회
    @Transactional(readOnly = true)
    public List<Book> findBookbyISBN(String isbn){
        return bookRepository.findByIsbn(isbn);
    }
    
    @Transactional
    public void updateImgUrl(Long id, String imgUrl) {
        bookImgRepository.updateImgUrl(id, imgUrl);
    }
    
//    @Transactional(readOnly = true)
//    public BookFormDto getBookDtl(Long bookId){
//        BookImg bookImgList = bookImgRepository.findById(bookId).get();
//        BookImgDto bookImgDtoList = BookImgDto.of(bookImgList);
//
//        Book book = bookRepository.findById(bookId)
//                .orElseThrow(EntityNotFoundException::new);
//        BookFormDto bookFormDto = BookFormDto.of(book);
//        bookFormDto.setBookImgDto(bookImgDtoList);
//        return bookFormDto;
//    }
    
   

//    public Long updateBook(BookFormDto bookFormDto, List<MultipartFile> bookImgFileList) throws Exception{
//        //상품 수정
//        Book book = bookRepository.findById(bookFormDto.getId())
//                .orElseThrow(EntityNotFoundException::new);
//        book.updateBook(bookFormDto);
//        Long bookImgId = bookFormDto.getBookImgId();
//
//        //이미지 등록
//        for(int i=0;i<bookImgFileList.size();i++){
//            bookImgService.updateBookImg(bookImgId, bookImgFileList.get(i));
//        }
//
//        return book.getId();
//    }
}
