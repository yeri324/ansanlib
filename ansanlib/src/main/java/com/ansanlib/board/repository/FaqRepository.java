package com.ansanlib.board.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.Faq;

public interface FaqRepository extends JpaRepository<Faq, Long> {

	// 전부 가져오기
	Page<Faq> findAll(Pageable pageable);

//	Page<Faq> findAll(Specification<Faq> spec, Pageable pageable);

	// 제목으로 검색
	Page<Faq> findByTitleContains(String title, Pageable pageable);

	// 작성자로 검색
	Page<Faq> findByLibUser_LoginidContains(String userId, Pageable pageable);

}
