package com.ansanlib.book.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ansanlib.entity.Book;

import jakarta.transaction.Transactional;

public interface BookRepository extends JpaRepository<Book, Long>, BookRepositoryCustom {

	// 주어진 ID를 가진 책을 Optional로 반환합니다.
	// book 엔티티를 함께 로드합니다.
	@EntityGraph(attributePaths = { "bookImg" })
	Optional<Book> findById(Long id);

	// 주어진 ISBN을 가진 책 목록을 반환합니다.
	// book 엔티티를 함께 로드합니다.
	@EntityGraph(attributePaths = { "bookImg" })
	List<Book> findByIsbn(String isbn);

	List<Book> findByTitleContainingIgnoreCase(String title);


	@Query("SELECT b FROM Book b LEFT JOIN FETCH b.bookImg")
	List<Book> findAllWithImages();

	void deleteAllByIdIn(List<Long> ids);



	
	// 해당 사용자가 대출한 모든 책의 libUser를 null로 설정합니다.
	@Transactional
    @Modifying
    @Query("UPDATE Book b SET b.libUser = null WHERE b.libUser.userId = :userId")
    int resetUserFromBooks(@Param("userId") Long userId);


}