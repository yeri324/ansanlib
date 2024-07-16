package com.ansanlib.board.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.board.dto.RecBoardDto;
import com.ansanlib.board.dto.RecBoardFormDto;
import com.ansanlib.board.service.RecBoardService;
import com.ansanlib.entity.Book;
import com.ansanlib.entity.RecBoard;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/recboard")
@RequiredArgsConstructor
public class RecBoardController {

	private final RecBoardService recBoardService;
	
	// 생성
	@PostMapping(value = "/new")
	public ResponseEntity<?> createRec(@RequestBody RecBoardFormDto recFormDto)throws Exception {
		return recBoardService.createRec(recFormDto);
	}
	
	// 도서검색
	@PostMapping(value = "/searchbook")
	public ResponseEntity<List<Book>> bookList(@RequestBody RecBoardFormDto recBoardFormDto) throws Exception {
		return recBoardService.searchBook(recBoardFormDto);
	}
	
	// 리스트조회
	@PostMapping(value = "/list")
	public Page<RecBoard> getList(@RequestBody RecBoardDto recDto) throws Exception {
		return recBoardService.getRec(recDto);
	}
	
	// 삭제
	@DeleteMapping(value = "/delete")
	public void deleteRec(@RequestBody RecBoardFormDto recFormDto) throws Exception {
		recBoardService.deleteRec(recFormDto.getId());
	}
	
}
