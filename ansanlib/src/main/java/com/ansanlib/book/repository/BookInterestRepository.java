package com.ansanlib.book.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ansanlib.entity.Book;
import com.ansanlib.entity.BookInterest;
import com.ansanlib.entity.LibUser;

public interface BookInterestRepository extends JpaRepository<BookInterest, Long> {
	
    @Query("select bi from BookInterest bi join fetch bi.book where bi.libUser = :libUser")
    List<BookInterest> findByLibUser(@Param("libUser") LibUser libUser);

    int countBookInterestByLibUserAndBook(LibUser libUser, Book book);
}
