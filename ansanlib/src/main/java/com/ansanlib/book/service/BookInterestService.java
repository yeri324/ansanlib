package com.ansanlib.book.service;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public Page<BookInterest> findBookInterestsByUserId(Long userId, Pageable pageable) {
        LibUser libUser = libUserRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다: " + userId));
        return bookInterestRepository.findByLibUser(libUser, pageable);
    }

    public void insertBookInterest(Long userId, Long bookId) {
        LibUser libUser = libUserRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다: " + userId));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("해당 책을 찾을 수 없습니다: " + bookId));

        if (bookInterestRepository.countBookInterestByLibUserAndBook(libUser, book) == 0) {
            BookInterest bookInterest = new BookInterest(book, libUser, LocalDateTime.now());
            bookInterestRepository.save(bookInterest);
        }
    }

    public void deleteBookInterest(Long id) {
        BookInterest bookInterest = bookInterestRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 관심 도서를 찾을 수 없습니다: " + id));
        bookInterestRepository.delete(bookInterest);
    }
}