package com.ansanlib.requestBook.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ansanlib.admin.service.AdminUserService;
import com.ansanlib.entity.LibUser;
import com.ansanlib.entity.RequestBook;
import com.ansanlib.requestBook.dto.CreateRequestBookDto;
import com.ansanlib.requestBook.exception.CreateRequestBookException;
import com.ansanlib.requestBook.repository.RequestBookRepository;
import com.ansanlib.reservation.exception.CreateReservationException;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class RequestBookService {
	@Autowired
	private RequestBookRepository requestBookRepository;

	@Autowired
	private AdminUserService adminUserService;
	
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
	    
	    
	    //사용자 존재여부 확인
	    try {
	    	libUser = adminUserService.getUserById(createRequestBookDto.getUserId());
	    } catch (EntityNotFoundException exception) {
	    	throw new CreateReservationException("해당 사용자를 찾을 수 없습니다.");
	    }
	    	    
	    if (requestBookRepository.checkIfOverlappingReqeustBooksExists(
	    		requestBook.getIsbn(),
	    		requestBook.getTitle(),
	    		requestBook.getAuthor()
	    		)) {
	    	throw new CreateRequestBookException("이미 신청된 책입니다.");
	    }
	    
	    
	    //희망 도서 정보 저장
	    return requestBookRepository.save(requestBook);
	}
	
    public List<RequestBook> getRequestBooksByUser(Long userId) {
        return requestBookRepository.findByUserId(userId);
    }

    public RequestBook getRequestBookById(Long id) {
        return requestBookRepository.findById(id).orElse(null);
    }

    public void deleteRequestBook(Long id) throws Exception {
        RequestBook requestBook = requestBookRepository.findById(id)
            .orElseThrow(() -> new Exception("신청된 도서를 찾을 수 없습니다."));
        requestBookRepository.delete(requestBook);
    }
    
    @Transactional
    public void deleteRequestBookByUserId(Long userId) {
        requestBookRepository.deleteByLibUserId(userId);
    }
}
