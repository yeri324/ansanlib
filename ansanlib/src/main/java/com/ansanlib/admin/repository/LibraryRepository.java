package com.ansanlib.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.Library;

public interface LibraryRepository extends JpaRepository<Library, Long> {
	Library findByLibNum(String libnum);
}
