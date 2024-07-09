package com.ansanlib.board.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.Board;

public interface BoardRepository extends JpaRepository<Board, Long>{

	// 전부 가져오기
	Page<Board> findAll(Pageable pageable);

	// 제목으로 검색
	Page<Board> findByTitleContains(String title, Pageable pageable);

	// 작성자로 검색
	Page<Board> findByLibUser_LoginidContains(String userId, Pageable pageable);
}
