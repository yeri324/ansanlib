package com.ansanlib.visit.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.Visit;

public interface VisitRepository extends JpaRepository<Visit, Long> {

	 List<Visit> findByTimeStampBetween(LocalDateTime startDate, LocalDateTime endDate); // timeStamp로 수정
	    long countByTimeStampBetween(LocalDateTime startDate, LocalDateTime endDate); // timeStamp로 수정


}
