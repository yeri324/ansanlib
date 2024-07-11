package com.ansanlib.board.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.NoticeImg;
import com.ansanlib.entity.FaqImg;

public interface NoticeImgRepository extends JpaRepository<NoticeImg, Long>{

	List<NoticeImg> findByNotice_IdOrderByIdAsc(Long id);
	
	Optional<NoticeImg> findByNotice_IdAndId(Long id,Long id2);
}
