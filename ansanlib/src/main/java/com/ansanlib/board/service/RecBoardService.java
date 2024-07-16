package com.ansanlib.board.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.board.dto.RecBoardDto;
import com.ansanlib.board.dto.RecBoardFormDto;
import com.ansanlib.board.repository.RecBoardRepository;
import com.ansanlib.book.repository.BookRepository;
import com.ansanlib.entity.Book;
import com.ansanlib.entity.RecBoard;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RecBoardService {
	
	private final RecBoardRepository recBoardRepository;
	private final BookRepository bookRepository;

	// 생성
	public ResponseEntity<?> createRec(RecBoardFormDto recFormDto) throws Exception {
		RecBoard recBoard = new RecBoard();
		recBoard.setTitle(recFormDto.getTitle());
		recBoard.setContent(recFormDto.getContent());
		Optional<Book> book = bookRepository.findById(recFormDto.getBookId());
		recBoard.setBook(book.get());
		recBoardRepository.save(recBoard);
		return ResponseEntity.status(HttpStatus.OK).body(recBoard);
	}
	
	// 게시판 조회
	public Page<RecBoard> getRec(RecBoardDto recDto) throws Exception {
		Pageable pageable = PageRequest.of(recDto.getPage(), recDto.getSize(), Sort.by(Order.desc("regTime")));
		return recBoardRepository.findAll(pageable);
	}
	
	// 생성시 도서검색
	public ResponseEntity<?> searchBook(RecBoardFormDto recFormDto) throws Exception {
		if(recFormDto.getSearchQuery() == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST);
		} else {
			RecBoard recBoard = bookRepository.findByTitleContainingIgnoreCase(recFormDto.getSearchQuery());
			return ResponseEntity.status(HttpStatus.OK).body(recBoard);
		}
	}
	
	// 삭제
	public void deleteRec(Long id) throws Exception {
		recBoardRepository.deleteById(id);
	}

}
