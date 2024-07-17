package com.ansanlib.board.service;

import java.util.List;
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
	public ResponseEntity<?> createRec(RecBoardDto recDto) throws Exception {
		RecBoard recBoard = new RecBoard();
		recBoard.setTitle(recDto.getTitle());
		recBoard.setContent(recDto.getContent());
		Optional<Book> book = bookRepository.findById(recDto.getBookId());
		recBoard.setBook(book.get());
		recBoardRepository.save(recBoard);
		return ResponseEntity.status(HttpStatus.OK).body(recBoard);
	}
	
	// 도서검색
	public ResponseEntity<List<Book>> searchBook(RecBoardDto recDto) throws Exception {
		if(recDto.getSearchQuery()==null || recDto.getSearchQuery()=="") {
			List<Book> book = bookRepository.findAll();
			return ResponseEntity.status(HttpStatus.OK).body(book);
		}else {
			List<Book> book = bookRepository.findByTitleIgnoringSpaces(recDto.getSearchQuery());
			return ResponseEntity.status(HttpStatus.OK).body(book);}
	}
	
	// 게시판 조회
	public Page<RecBoard> getRec(RecBoardDto recDto) throws Exception {
		Pageable pageable = PageRequest.of(recDto.getPage(), recDto.getSize(), Sort.by(Order.desc("regTime")));
		return recBoardRepository.findAll(pageable);
	}
	
	// 삭제
	public void deleteRec(Long id) throws Exception {
		recBoardRepository.deleteById(id);
	}

}
