package com.ansanlib.board.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.FaqImg;

public interface FaqImgRepository extends JpaRepository<FaqImg, Long> {

	List<FaqImg> findByFaq_IdOrderByIdAsc(Long id);
	
	Optional<FaqImg> findByFaq_IdAndId(Long id,Long id2);
}
