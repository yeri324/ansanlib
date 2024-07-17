package com.ansanlib.admin.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.book.dto.BookDto;
import com.ansanlib.book.repository.BookImgRepository;
import com.ansanlib.book.repository.BookRepository;
import com.ansanlib.book.service.FileService;
import com.ansanlib.entity.Book;
import com.ansanlib.entity.BookImg;
import com.ansanlib.entity.RequestBook;
import com.ansanlib.library.LibraryRepository;
import com.ansanlib.requestBook.repository.RequestBookRepository;

@Service
public class AdminBookService {

	@Autowired
	private FileService fileService;

	@Autowired
	private BookRepository bookRepository;

	@Autowired
	private RequestBookRepository requestBookRepository;

	@Autowired
	private BookImgRepository bookImgRepository;
	
	@Autowired
	private LibraryRepository libraryRepository;

	public BookDto saveBook(BookDto bookDto, MultipartFile file) throws IOException {
		// 도서 등록
		Book book = new Book();
		book.setIsbn(bookDto.getIsbn());
		book.setTitle(bookDto.getTitle());
		book.setAuthor(bookDto.getAuthor());
		book.setPublisher(bookDto.getPublisher());
		book.setPub_date(bookDto.getPub_date());
		book.setCategory_code(bookDto.getCategory_code());
		book.setBookDetail(bookDto.getBookDetail());
		book.setCount(bookDto.getCount());
		book.setLib_name(bookDto.getLib_name());
		
		Book savedBook = bookRepository.save(book);
		bookDto.setId(savedBook.getId());

		if (file != null && !file.isEmpty()) {
			try {
				Map<String, String> fileData = fileService.fileHandler(file, "book_images", savedBook.getId());
				if (fileData != null) {
					BookImg bookImg = new BookImg();
					bookImg.setImgName(fileData.get("imgName"));
					bookImg.setImgUrl(fileData.get("imgUrl"));
					bookImg.setOriImgName(fileData.get("oriImgName"));
					bookImg.setBook(savedBook);
					bookImgRepository.save(bookImg);
				}
			} catch (Exception e) {
				e.printStackTrace();
				throw new IOException("파일 저장 중 오류가 발생했습니다.");
			}
		}

		return bookDto;
	}

	// 도서조회
	public List<Book> getAllBooks() {
		return bookRepository.findAllWithImages();
	}

//희망도서신청조회
	public List<RequestBook> getAllRequestBooks() {
		return requestBookRepository.findAll();
	}

	
	 @Transactional
	    public void deleteBookById(Long id) {
	        Optional<Book> bookOptional = bookRepository.findById(id);
	        if (bookOptional.isPresent()) {
	            bookRepository.deleteById(id);
	        } else {
	            throw new IllegalArgumentException("Book not found with id: " + id);
	        }
	    }
}

	
	
