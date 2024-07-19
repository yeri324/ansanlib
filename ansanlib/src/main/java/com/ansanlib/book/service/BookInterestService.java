package com.ansanlib.book.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.book.dto.BookInterestDto;
import com.ansanlib.book.repository.BookInterestRepository;
import com.ansanlib.book.repository.BookRepository;
import com.ansanlib.book.repository.LibUserRepository;
import com.ansanlib.entity.Book;
import com.ansanlib.entity.BookInterest;
import com.ansanlib.entity.LibUser;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BookInterestService {
    
    private final BookInterestRepository bookInterestRepository;
    private final LibUserRepository libUserRepository;
    private final BookRepository bookRepository;

    // 관심도서 등록
    public void insertBookInterest(String email, Long bookId) {
        LibUser libUser = libUserRepository.findByEmail(email);
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new NoSuchElementException("Book not found"));
        
        if (bookInterestRepository.countBookInterestByLibUserAndBook(libUser, book) == 0) {
            BookInterest bookInterest = new BookInterest(book, libUser, LocalDateTime.now());
            bookInterestRepository.save(bookInterest);
        }
    }

    // 관심도서 삭제
    public void deleteBookInterest(Long id) {
        bookInterestRepository.deleteById(id);
    }

    // 관심도서 리스트 조회
    public List<BookInterestDto> getBookInterestList(String email) {
        LibUser libUser = libUserRepository.findByEmail(email);
        return bookInterestRepository.findByLibUser(libUser).stream()
                .map(BookInterestDto::fromEntity)
                .collect(Collectors.toList());
    }
}