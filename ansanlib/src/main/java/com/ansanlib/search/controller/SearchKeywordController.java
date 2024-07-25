package com.ansanlib.search.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.search.dto.KeywordRequest;
import com.ansanlib.search.repository.SearchKeywordService;

@RestController
@RequestMapping("/api/search")
public class SearchKeywordController {

    @Autowired
    private SearchKeywordService searchKeywordService;

    @PostMapping("/save_keyword")
    public ResponseEntity<?> saveKeyword(@RequestBody KeywordRequest request) {
        searchKeywordService.saveSearchKeyword(request.getUserId(), request.getGender(), request.getKeyword());
        return ResponseEntity.ok().body("Keyword saved successfully");
    }

    @GetMapping("/wordcloud/{gender}")
    public ResponseEntity<List<String>> getWordcloudForGender(@PathVariable String gender) {
        List<String> keywords = searchKeywordService.getSearchKeywordsByGender(gender);
        return ResponseEntity.ok().body(keywords);
    }
}
