package com.ansanlib.repository.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.Faq;

public interface FaqRepository extends JpaRepository<Faq, Long>{

	Faq findByTitle(String title);

	Faq findByContent(String content);
	
	Page<Faq> findAll(Pageable pageable);

//	Page<Faq> findAll(Specification<Faq> spec, Pageable pageable);
	
}
