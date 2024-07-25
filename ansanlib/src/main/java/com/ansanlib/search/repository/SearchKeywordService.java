package com.ansanlib.search.repository;

import java.util.List;

public interface SearchKeywordService {
	void saveSearchKeyword(Long userId, String gender, String keyword);
    List<String> getSearchKeywordsByGender(String gender);
}
