package com.ansanlib.book.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ansanlib.entity.Book;
import com.ansanlib.entity.BookInterest;
import com.ansanlib.entity.LibUser;

public interface BookInterestRepository extends JpaRepository<BookInterest, Long> {
//    @EntityGraph(attributePaths = {"book"})
//    public List<BookInterest> findByLibUser(LibUser libUser);

    @Query("select bi from BookInterest  bi join fetch bi.book b where bi.libUser=:libUser")
    public List<BookInterest> findByLibUser(@Param("libUser") LibUser libUser);

    public int countBookInterestByLibUserAndBook(LibUser libUser, Book book);
}
