package com.ansanlib.admin.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.constant.PopupStatus;
import com.ansanlib.entity.Popup;

public interface PopupRepository extends JpaRepository<Popup, Long> {
	
	List<Popup> findByStartDateLessThanEqualAndEndDateGreaterThanEqualAndStatus(LocalDate today,LocalDate today2,PopupStatus status);
}
