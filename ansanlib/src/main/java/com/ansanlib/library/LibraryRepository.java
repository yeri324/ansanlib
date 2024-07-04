package com.ansanlib.library;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.Library;

public interface LibraryRepository extends JpaRepository<Library, Long> {
	Library findByLibNum(String libnum);

	Library findByLibName(Library lib_name);

	Optional<Library> findByLibNameAndLibNum(String libName, String libNum);


}
