package com.ansanlib.requestBook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ansanlib.entity.RequestBook;

@Repository
public interface RequestBookRepository extends JpaRepository<RequestBook, Long>{
	@Query("SELECT r FROM RequestBook r WHERE r.libUser.userId = :userId")
	List<RequestBook> findByUserId(Long userId);
	
	@Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM RequestBook r WHERE r.isbn = :isbn AND r.title = :title AND r.author = :author")	boolean checkIfOverlappingReqeustBooksExists(
			@Param("isbn") String isbn,
			@Param("title") String title,
			@Param("author") String author);
	
}
