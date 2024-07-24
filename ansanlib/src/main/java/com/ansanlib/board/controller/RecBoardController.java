package com.ansanlib.board.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.board.dto.RecBoardDto;
import com.ansanlib.board.service.RecBoardService;
import com.ansanlib.entity.Book;
import com.ansanlib.entity.RecBoard;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class RecBoardController {

	private final RecBoardService recBoardService;
	
	// 생성
	@Secured("ROLE_ADMIN")
	@PostMapping(value = "/admin/recboard/new")
	public ResponseEntity<?> createRec(@RequestBody RecBoardDto recDto)throws Exception {
		return recBoardService.createRec(recDto);
	}
	
	// 도서검색
	@Secured("ROLE_ADMIN")
	@PostMapping(value = "/admin/recboard/searchbook")
	public ResponseEntity<List<Book>> bookList(@RequestBody RecBoardDto recDto) throws Exception {
		return recBoardService.searchBook(recDto);
	}
	
	// 리스트조회
	@PostMapping(value = "/recboard/search")
	public Page<RecBoard> getList(@RequestBody RecBoardDto recDto) throws Exception {
		return recBoardService.getRec(recDto);
	}
	
	// 삭제
	@Secured("ROLE_ADMIN")
	@DeleteMapping(value = "/admin/recboard/delete")
	public void deleteRec(@RequestBody RecBoardDto recDto) throws Exception {
		recBoardService.deleteRec(recDto.getId());
	}
	
}
