package com.ansanlib.requestBook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ansanlib.entity.RequestBook;

@Repository
public interface RequestBookRepository extends JpaRepository<RequestBook, Long>{
	@Query("SELECT r FROM RequestBook r WHERE r.libUser.userId = :userId")
	List<RequestBook> findByUserId(Long userId);
}
