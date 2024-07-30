package com.ansanlib.book.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.entity.Book;

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

	   
	   //도서-도서관 중복확인
	    boolean existsByIsbnAndLibName(String isbn, String libName); // lib_name 사용

		
		@Query("SELECT b FROM Book b WHERE REPLACE(b.title, ' ', '') LIKE %:query%")
		List<Book> findByTitleIgnoringSpaces(String query);


		
		//삭제
	    void deleteByLibNameAndTitle(String libName, String title);

	    @Modifying
	    @Transactional
	    @Query("UPDATE Book b SET b.count = :count WHERE b.libName = :libName AND b.title = :title")
	    void updateBookCountByLibNameAndTitle(@Param("libName") String libName, @Param("title") String title, @Param("count") int count);

		Optional<Book> findByLibNameAndTitle(String libName, String title);
		
		
		
		
		  @Query("SELECT b FROM Book b ORDER BY b.id DESC")
		    List<Book> findAllOrderByIdDesc();
		
	}
