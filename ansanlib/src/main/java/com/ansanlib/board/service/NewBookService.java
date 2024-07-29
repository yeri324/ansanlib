package com.ansanlib.board.service;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.board.dto.RecBoardDto;
import com.ansanlib.book.repository.BookRepository;
import com.ansanlib.entity.Book;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class NewBookService {
	
	private final BookRepository bookRepository;
	
	// 조회
	public Page<Book> listNewbook(RecBoardDto recBoardDto){
		Pageable pageable = PageRequest.of(recBoardDto.getPage(), recBoardDto.getSize(), Sort.by(Order.desc("regTime")));
		
		LocalDateTime now = LocalDateTime.now();
        LocalDateTime oneMonthAgo = now.minusMonths(1);
    
        Page<Book> bookList= bookRepository.findByRegTimeBetween(oneMonthAgo, now, pageable);
        return bookList;
	}
	
}
