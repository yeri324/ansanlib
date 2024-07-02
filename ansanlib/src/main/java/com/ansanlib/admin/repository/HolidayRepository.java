package com.ansanlib.admin.repository;

import com.ansanlib.entity.Holiday;
import com.ansanlib.entity.LoanStatus;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HolidayRepository extends JpaRepository<Holiday, Long> {
	
}
