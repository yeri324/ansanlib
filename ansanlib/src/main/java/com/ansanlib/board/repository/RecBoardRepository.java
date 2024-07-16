package com.ansanlib.board.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.RecBoard;

public interface RecBoardRepository extends JpaRepository<RecBoard, Long> {
	
	// 전부 가져오기
	Page<RecBoard> findAll(Pageable pageable);
}
