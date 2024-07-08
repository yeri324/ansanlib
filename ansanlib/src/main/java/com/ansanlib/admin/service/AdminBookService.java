package com.ansanlib.admin.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.book.dto.BookDto;
import com.ansanlib.book.repository.BookImgRepository;
import com.ansanlib.book.repository.BookRepository;
import com.ansanlib.entity.Book;
import com.ansanlib.entity.BookImg;
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

	public Book saveBook(BookDto bookDto, MultipartFile file) throws IOException {
		Book book = new Book();
		book.setTitle(bookDto.getTitle());
		book.setAuthor(bookDto.getAuthor());
		book.setIsbn(bookDto.getIsbn());
		book.setPublisher(bookDto.getPublisher());
		book.setPub_date(bookDto.getPub_date());
		book.setCategory_code(bookDto.getCategory_code());
		book.setLocation(bookDto.getLocation());
		book.setBookDetail(bookDto.getBookDetail());
		// book.library.setLib_name(bookDto.getLib_name());
		book.setCount(bookDto.getCount());

		if (file != null && !file.isEmpty()) {
			BookImg bookImg = new BookImg();
			bookImg.setImgName(file.getOriginalFilename());
			bookImgRepository.save(bookImg);
			book.setBookImg(bookImg);
		}

		return bookRepository.save(book);
	}

	
	
//희망도서신청조회
	 public List<RequestBook> getAllRequestBooks() {
	        return requestBookRepository.findAll();
	    }
}
