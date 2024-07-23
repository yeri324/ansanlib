package com.ansanlib.book.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ansanlib.entity.Book;
import com.ansanlib.entity.BookInterest;
import com.ansanlib.entity.LibUser;

public interface BookInterestRepository extends JpaRepository<BookInterest, Long> {

    @Query("select bi from BookInterest bi join fetch bi.book b where bi.libUser = :libUser")
    Page<BookInterest> findByLibUser(@Param("libUser") LibUser libUser, Pageable pageable);

    int countBookInterestByLibUserAndBook(LibUser libUser, Book book);
}