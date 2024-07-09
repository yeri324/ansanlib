package com.ansanlib.board.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long>{

	// 전부 가져오기
	Page<Notice> findAll(Pageable pageable);

	// 제목으로 검색
	Page<Notice> findByTitleContains(String title, Pageable pageable);

	// 작성자로 검색
	Page<Notice> findByLibUser_LoginidContains(String userId, Pageable pageable);
}
