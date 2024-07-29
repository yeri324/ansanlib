package com.ansanlib.search.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ansanlib.entity.SearchKeyword;

public interface SearchKeywordRepository extends JpaRepository<SearchKeyword, Long> {
    List<SearchKeyword> findByGender(String gender);
}
