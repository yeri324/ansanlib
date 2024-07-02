package com.ansanlib.library;

import com.ansanlib.entity.Library;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LibraryRepository extends JpaRepository<Library, Long> {
    Optional<Library> findById(Long id);
    // You can define custom query methods here if needed
}
