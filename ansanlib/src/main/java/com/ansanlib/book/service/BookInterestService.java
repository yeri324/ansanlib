package com.ansanlib.book.service;

import java.time.LocalDateTime;
import java.util.List;
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
    public void insertBookInterest(String email, Long bid) {
        LibUser libUser = libUserRepository.findByEmail(email);
        Book book = bookRepository.findById(bid).orElseThrow(() -> new IllegalArgumentException("책을 찾을 수 없습니다."));

        // 로그인한 유저가 이미 해당 도서를 관심도서로 등록하지 않은 경우에만 db에 저장
        if (bookInterestRepository.countBookInterestByLibUserAndBook(libUser, book) == 0) {
            BookInterest bookInterest = new BookInterest(book, libUser, LocalDateTime.now());
            bookInterestRepository.save(bookInterest);
        }
    }

    // 관심도서 삭제
    public void deleteBookInterest(Long id) {
        BookInterest bookInterest = bookInterestRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("관심도서를 찾을 수 없습니다."));
        bookInterestRepository.delete(bookInterest);
    }

    // 관심도서 리스트 가져오기
    public List<BookInterestDto> getBookInterestList(String email) {
        LibUser libUser = libUserRepository.findByEmail(email);
        List<BookInterest> bookInterests = bookInterestRepository.findByLibUser(libUser);
        return bookInterests.stream().map(BookInterestDto::new).collect(Collectors.toList());
    }
}