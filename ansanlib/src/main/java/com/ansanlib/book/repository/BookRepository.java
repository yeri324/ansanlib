package com.ansanlib.book.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long>, BookRepositoryCustom {

	// 주어진 키워드를 포함하는 책 이름을 가진 책 목록을 반환합니다.
	List<Book> findByTitleContaining(String keyword);

	// 주어진 키워드를 포함하는 책 이름을 가진 책 목록을 페이지네이션하여 반환합니다.
	// book 엔티티를 함께 로드합니다.
	@EntityGraph(attributePaths = { "bookImg" })
	Page<Book> findByTitleContaining(String keyword, Pageable pageable);

	// 주어진 ID를 가진 책을 Optional로 반환합니다.
	// book 엔티티를 함께 로드합니다.
	@EntityGraph(attributePaths = { "bookImg" })
	Optional<Book> findById(Long id);

	// 주어진 ISBN을 가진 책 목록을 반환합니다.
	// book 엔티티를 함께 로드합니다.
	@EntityGraph(attributePaths = { "bookImg" })
	List<Book> findByIsbn(String isbn);

	// 주어진 ISBN을 가진 책의 개수를 반환합니다.
	int countByIsbn(String isbn);
}
