package com.ansanlib.board.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.BoardImg;
import com.ansanlib.entity.FaqImg;

public interface BoardImgRepository extends JpaRepository<BoardImg, Long>{

	List<BoardImg> findByBoard_IdOrderByIdAsc(Long id);
	
	Optional<BoardImg> findByBoard_IdAndId(Long id,Long id2);
}
