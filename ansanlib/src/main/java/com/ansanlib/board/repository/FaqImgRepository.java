package com.ansanlib.board.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.FaqImg;

public interface FaqImgRepository extends JpaRepository<FaqImg, Long> {

	List<FaqImg> findByFaqIdOrderByIdAsc(Long id);

	FaqImg findByFaqIdAndRepImgYn(Long id, String repImgYn);
}
