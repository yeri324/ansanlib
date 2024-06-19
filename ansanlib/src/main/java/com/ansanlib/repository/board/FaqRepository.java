package com.ansanlib.repository.board;

<<<<<<< HEAD
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
=======
>>>>>>> 7a278dc05c6f0c211e06906796e1ca0a80c2d62c
import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.Faq;

public interface FaqRepository extends JpaRepository<Faq, Long>{

<<<<<<< HEAD
	Faq findByTitle(String title);

	Faq findByContent(String content);
	
	Page<Faq> findAll(Pageable pageable);

//	Page<Faq> findAll(Specification<Faq> spec, Pageable pageable);
	
=======
>>>>>>> main
}
