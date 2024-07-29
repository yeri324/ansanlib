package com.ansanlib.book.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.book.dto.BookDto;
import com.ansanlib.book.dto.BookSearchCondition;
import com.ansanlib.book.repository.BookImgRepository;
import com.ansanlib.book.repository.BookRepository;
import com.ansanlib.book.repository.BookRepositoryCustom;
import com.ansanlib.entity.Book;
import com.ansanlib.reservation.service.ReservationService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BookService {

	private final BookRepository bookRepository;
	private final BookImgRepository bookImgRepository;
	private final BookRepositoryCustom bookRepositoryCustom;
	private final ModelMapper modelMapper;
    private final ReservationService reservationService;

    // 검색
    @Transactional(readOnly = true)
    public Page<Book> searchBookPageSimple(BookSearchCondition condition, Pageable pageable) {
        return bookRepositoryCustom.searchBookPageSimple(condition, pageable);
    }

    // 상세정보
    // 도서 id 기반 검색 -> BookDto 변환
    @Transactional(readOnly = true)
    public BookDto findBookById(Long id) {
        // Book 엔티티를 조회
        Optional<Book> optionalBook = bookRepository.findById(id);
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            // Book 엔티티를 BookDto로 변환
            BookDto bookDto = modelMapper.map(book, BookDto.class);
            return bookDto;
        } else {
            // ID가 유효하지 않으면 예외 처리
            throw new EntityNotFoundException("Book not found with id " + id);
        }
    }

    // 도서 isbn 기반 조회
    @Transactional(readOnly = true)
    public List<Book> findBookbyISBN(String isbn) {
        return bookRepository.findByIsbn(isbn);
    }

    public List<Book> findBooksByTitle(String title) {
        return bookRepository.findByTitleContainingIgnoreCase(title);
    }

    @Transactional
    public void updateImgUrl(Long id, String imgUrl) {
        bookImgRepository.updateImgUrl(id, imgUrl);
    }
}
