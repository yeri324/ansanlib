package com.ansanlib.admin.service;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.admin.repository.LoanStatusRepository;
import com.ansanlib.board.repository.RecBoardRepository;
import com.ansanlib.book.dto.BookDto;
import com.ansanlib.book.repository.BookImgRepository;
import com.ansanlib.book.repository.BookRepository;
import com.ansanlib.book.service.FileService;
import com.ansanlib.entity.Book;
import com.ansanlib.entity.BookImg;
import com.ansanlib.entity.LoanStatus;
import com.ansanlib.entity.RecBoard;
import com.ansanlib.entity.RequestBook;
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
	private RecBoardRepository recBoardRepository;

	@Autowired
	private LoanStatusRepository loanStatusRepository;

	// 도서-도서관 중복확인
	public boolean checkBookExists(String isbn, String libName) {
		return bookRepository.existsByIsbnAndLibName(isbn, libName); // lib_name 사용
	}

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
		book.setLibName(bookDto.getLibName());

		Book savedBook = bookRepository.save(book);
		bookDto.setId(savedBook.getId());

		if (file != null && !file.isEmpty()) {
			try {
				Map<String, String> fileData = fileService.fileHandler(file, "book", null);
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
	public void addLib(Long bookId, BookDto bookDto) throws Exception {
		Optional<Book> optionalBook = bookRepository.findById(bookId);
		if (optionalBook.isPresent()) {
			Book book = optionalBook.get();
			Book newBook = new Book();
			newBook.setTitle(book.getTitle());
			newBook.setAuthor(book.getAuthor());
			newBook.setPublisher(book.getPublisher());
			newBook.setPub_date(book.getPub_date());
			newBook.setLibName(bookDto.getLibName());
			newBook.setCount(bookDto.getCount());

			newBook.setIsbn(book.getIsbn());
			bookRepository.save(newBook);
		} else {
			throw new Exception("Book not found");
		}
	}

	// 도서권수 수정
	@Transactional
	public void updateBookCountByLibNameAndTitle(String libName, String title, int count) {
		System.out.println(libName);
		System.out.println(count);
		bookRepository.updateBookCountByLibNameAndTitle(libName, title, count);
	}

//		//삭제
	@Transactional
	public void deleteBookByLibNameAndTitle(String libName, String title) throws Exception {
		Optional<Book> bookOptional = bookRepository.findByLibNameAndTitle(libName, title);
		if (bookOptional.isPresent()) {
			Book book = bookOptional.get();

			// 책 이미지 삭제 로직 추가
			if (book.getBookImg() != null && book.getBookImg().getImgName() != null) {
				String imgPath = Paths.get("src/main/resources/static/images/book_images", String.valueOf(book.getId()),
						book.getBookImg().getImgName()).toString();
				fileService.deleteFile(imgPath);
			}

			// 책 삭제
			bookRepository.deleteByLibNameAndTitle(libName, title);
		} else {
			throw new IllegalArgumentException("Book not found with libName: " + libName + " and title: " + title);
		}
	}

	// 메인 추천도서
	public List<RecBoard> getRecBoards() {
		return recBoardRepository.findAll();
	}

	// 메인대출도서
	public List<LoanStatus> getAllLoanStatuses() {
		return loanStatusRepository.findAll();
	}

}
