package com.ansanlib.board.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.board.dto.RecBoardDto;
import com.ansanlib.board.service.NewBookService;
import com.ansanlib.entity.Book;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class NewBookController {
	
	private final NewBookService newBookService;
	
	//리스트 출력
	@PostMapping("/newBook")
	public Page<Book> listNewbook(@RequestBody RecBoardDto recBoardDto) throws Exception {
		Page<Book> newBook = newBookService.listNewbook(recBoardDto);
		return newBook;
	}

}
