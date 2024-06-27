package com.ansanlib.requestBook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.RequestBook;

public interface RequestBookRepository extends JpaRepository<RequestBook, Long>{
	List<RequestBook> findByLibUserUserId(Long userId);
}
