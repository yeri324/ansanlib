package com.ansanlib.admin.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ansanlib.entity.Holiday;

@Repository
public interface HolidayRepository extends JpaRepository<Holiday, Long> {

	 boolean existsByHolidayAndLibrary_LibName(LocalDate holiday, String libName);
	
}
