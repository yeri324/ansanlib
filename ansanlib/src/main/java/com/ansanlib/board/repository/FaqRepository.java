package com.ansanlib.board.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.Faq;

public interface FaqRepository extends JpaRepository<Faq, Long>{
	
	Faq findByTitle(String title);

	Faq findByContent(String content);
	
	Page<Faq> findAllByOrderByRegTime(Pageable pageable);

//	Page<Faq> findAll(Specification<Faq> spec, Pageable pageable);
	
	List<Faq> findByTitleContains(String title);
	List<Faq> findByLibUser_LoginidContains(String userId);
	
}
