package com.ansanlib.requestBook.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ansanlib.entity.LibUser;
import com.ansanlib.entity.RequestBook;
import com.ansanlib.requestBook.dto.CreateRequestBookDto;
import com.ansanlib.requestBook.repository.RequestBookRepository;

@Service
public class RequestBookService {
	@Autowired
	private RequestBookRepository requestBookRepository;

	
	public RequestBook createRequestBook(CreateRequestBookDto createRequestBookDto) {
		
		//희망 도서 entity 생성
		RequestBook requestBook = new RequestBook();
	    requestBook.setIsbn(createRequestBookDto.getIsbn());
	    requestBook.setTitle(createRequestBookDto.getTitle());
	    requestBook.setAuthor(createRequestBookDto.getAuthor());
	    requestBook.setPublisher(createRequestBookDto.getPublisher());
	    requestBook.setPub_date(createRequestBookDto.getPubDate());
	    requestBook.setRegist_date(LocalDateTime.now());

	    LibUser libUser = new LibUser();
	    libUser.setUserId(createRequestBookDto.getUserId());
	    requestBook.setLibUser(libUser);
	        
	    //희망 도서 정보 저장
	    return requestBookRepository.save(requestBook);
	}
	
    public List<RequestBook> getRequestBooksByUserId(Long userId) {
        return requestBookRepository.findByLibUserUserId(userId);
    }

    public RequestBook getRequestBookById(Long id) {
        return requestBookRepository.findById(id).orElse(null);
    }

    public void deleteRequestBook(Long id) throws Exception {
        RequestBook requestBook = requestBookRepository.findById(id)
            .orElseThrow(() -> new Exception("신청된 도서를 찾을 수 없습니다."));
        requestBookRepository.delete(requestBook);
    }
}
