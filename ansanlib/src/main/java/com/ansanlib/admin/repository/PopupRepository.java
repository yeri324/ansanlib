package com.ansanlib.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.admin.dto.AdminPopupDto;
import com.ansanlib.constant.PopupStatus;
import com.ansanlib.entity.Popup;

public interface PopupRepository extends JpaRepository<Popup, Long> {
	
	List<Popup> findByStatus(PopupStatus status);
}
