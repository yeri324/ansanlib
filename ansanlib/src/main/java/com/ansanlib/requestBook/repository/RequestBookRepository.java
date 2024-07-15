package com.ansanlib.requestBook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ansanlib.entity.RequestBook;

import jakarta.transaction.Transactional;

@Repository
public interface RequestBookRepository extends JpaRepository<RequestBook, Long>{
	@Query("SELECT r FROM RequestBook r WHERE r.libUser.userId = :userId")
	List<RequestBook> findByUserId(Long userId);
	
	@Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM RequestBook r WHERE r.isbn = :isbn AND r.libUser.userId = :userId")
	boolean checkIfOverlappingReqeustBookExists(
			@Param("isbn") String isbn,
			@Param("userId") Long userId);
	
	@Transactional
    @Modifying
    @Query("DELETE FROM RequestBook r WHERE r.libUser.userId = :userId AND r.id = :requestBookId")
    int deleteBookBelongsTo(@Param("requestBookId") Long requestBookId, @Param("userId") Long userId);

	
	 @Modifying
	 @Transactional
	 @Query("DELETE FROM RequestBook r WHERE r.libUser.userId = :userId")
	 void deleteByLibUserId(@Param("userId")Long userId);
}
