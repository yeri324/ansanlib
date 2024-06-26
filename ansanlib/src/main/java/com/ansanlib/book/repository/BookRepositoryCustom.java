package com.ansanlib.book.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ansanlib.book.dto.BookSearchCondition;
import com.ansanlib.entity.Book;

public interface BookRepositoryCustom {
    List<Book> searchBook(BookSearchCondition condition);

    Page<Book> searchBookPageSimple(BookSearchCondition condition, Pageable pageable);
}
