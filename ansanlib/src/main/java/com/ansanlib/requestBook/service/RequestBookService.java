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
	
	@Transactional
	public RequestBook createRequestBook(long userId, CreateRequestBookDto createRequestBookDto) {
		
		//희망 도서 entity 생성
		RequestBook requestBook = new RequestBook();
	    requestBook.setIsbn(createRequestBookDto.getIsbn());
	    requestBook.setTitle(createRequestBookDto.getTitle());
	    requestBook.setAuthor(createRequestBookDto.getAuthor());
	    requestBook.setPublisher(createRequestBookDto.getPublisher());
	    requestBook.setPub_date(createRequestBookDto.getPubDate());
	    requestBook.setRegist_date(LocalDateTime.now());
	    requestBook.setLib_name(createRequestBookDto.getLib_name());

	    
        //사용자 존재여부 확인
	    LibUser user;
        try {
            user = adminUserService.getUserById(userId);
        } catch (EntityNotFoundException exception) {
            throw new CreateReservationException("해당 사용자를 찾을 수 없습니다.");
        }
        
        //LibUser 설정
        requestBook.setLibUser(user);
        
        //신청 도서 중복 검사
        if (requestBookRepository.checkIfOverlappingReqeustBookExists(
                requestBook.getIsbn(),
                requestBook.getLibUser().getUserId()
                )) {
            throw new CreateRequestBookException("이미 신청된 책입니다.");
        }
	      
	    //희망 도서 정보 저장
	    return requestBookRepository.save(requestBook);
	}
	
	@Transactional
    public List<RequestBook> getRequestBooksByUser(Long userId) {
        return requestBookRepository.findByUserId(userId);
    }
	
	@Transactional
    public RequestBook getRequestBookById(Long requestBookId) {
        return requestBookRepository.findById(requestBookId).orElse(null);
    }
	
	@Transactional
    public void deleteRequestBook(Long requestBookId) throws Exception {
        RequestBook requestBook = requestBookRepository.findById(requestBookId)
            .orElseThrow(() -> new Exception("신청된 도서를 찾을 수 없습니다."));
        requestBookRepository.delete(requestBook);
    }
    
    //회원 탈퇴 관련
    @Transactional
    public void deleteRequestBookByUserId(Long userId) {
        requestBookRepository.deleteByLibUserId(userId);
    }
}
