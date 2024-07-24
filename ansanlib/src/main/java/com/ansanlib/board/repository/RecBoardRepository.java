package com.ansanlib.board.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ansanlib.entity.RecBoard;

public interface RecBoardRepository extends JpaRepository<RecBoard, Long> {
	
	// 전부 가져오기
	Page<RecBoard> findAll(Pageable pageable);

	//어드민 메인에서 볼려고 넣어논거야!!!!!!
	 @Query("SELECT r FROM RecBoard r")
	    List<RecBoard> findRecBoards();

	 
	  
	  //으드민 삭제하려고 넣어논거야!!
	  @Modifying
	    @Query("DELETE FROM RecBoard rb WHERE rb.book.id = :bookId")
	    void deleteByBookNum(@Param("bookId") Long bookId);
	}
	  
	  
	

