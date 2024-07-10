package com.ansanlib.admin.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.book.dto.BookDto;
import com.ansanlib.book.repository.BookImgRepository;
import com.ansanlib.book.repository.BookRepository;
import com.ansanlib.entity.Book;
import com.ansanlib.entity.RequestBook;
import com.ansanlib.requestBook.repository.RequestBookRepository;

@Service
public class AdminBookService {

	@Autowired
	private BookRepository bookRepository;

	@Autowired
	private RequestBookRepository requestBookRepository;

	@Autowired
	private BookImgRepository bookImgRepository;

	 public BookDto saveBook(BookDto bookDto, MultipartFile file) throws IOException {
	       
		 
		 //도서등록
	     Book book = new Book();
	        book.setIsbn(bookDto.getIsbn());
	        book.setTitle(bookDto.getTitle());
	        book.setAuthor(bookDto.getAuthor());
	        book.setPublisher(bookDto.getPublisher());
	        book.setPub_date(bookDto.getPub_date());
	        book.setCategory_code(bookDto.getCategory_code());
	        book.setLocation(bookDto.getLocation());
	        book.setBookDetail(bookDto.getBookDetail());
	    
	        book.setCount(bookDto.getCount());

	        if (file != null && !file.isEmpty()) {
	            // Handle file saving logic here
	            // Example: book.setBookImg(file.getOriginalFilename());
	        }

	        Book savedBook = bookRepository.save(book);
	        bookDto.setId(savedBook.getId());

	        return bookDto;
	    }

	
	
//희망도서신청조회
	 public List<RequestBook> getAllRequestBooks() {
	        return requestBookRepository.findAll();
	    }




}
