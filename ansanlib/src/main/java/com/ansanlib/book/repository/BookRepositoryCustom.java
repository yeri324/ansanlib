package com.ansanlib.book.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ansanlib.book.dto.BookSearchCondition;
import com.ansanlib.entity.Book;

public interface BookRepositoryCustom {

    Page<Book> searchBookPageSimple(BookSearchCondition condition, Pageable pageable);
}
