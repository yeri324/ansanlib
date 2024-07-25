package com.ansanlib.search.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ansanlib.book.repository.LibUserRepository;
import com.ansanlib.constant.Gender;
import com.ansanlib.entity.LibUser;
import com.ansanlib.entity.SearchKeyword;
import com.ansanlib.search.repository.SearchKeywordRepository;
import com.ansanlib.search.repository.SearchKeywordService;

@Service
public class SearchKeywordServiceImpl implements SearchKeywordService {

    @Autowired
    private SearchKeywordRepository searchKeywordRepository;

    @Autowired
    private LibUserRepository libUserRepository;

    @Override
    public void saveSearchKeyword(Long userId, String gender, String keyword) {
        LibUser user = libUserRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        SearchKeyword searchKeyword = new SearchKeyword();
        searchKeyword.setUser(user);
        searchKeyword.setGender(Gender.fromString(gender));
        searchKeyword.setKeyword(keyword);
        searchKeywordRepository.save(searchKeyword);
    }

    @Override
    public List<String> getSearchKeywordsByGender(String gender) {
        List<SearchKeyword> keywords = searchKeywordRepository.findByGender(gender);
        return keywords.stream().map(SearchKeyword::getKeyword).collect(Collectors.toList());
    }
}