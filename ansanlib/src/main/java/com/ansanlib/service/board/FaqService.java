package com.ansanlib.service.board;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.dto.board.FaqFormDto;
import com.ansanlib.entity.Faq;
import com.ansanlib.repository.board.FaqRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class FaqService {
	
	private final FaqRepository faqRepository;
	
	public Long saveFaq(FaqFormDto faqFormDto) throws Exception{
		Faq faq = faqFormDto.createFaq();
		faqRepository.save(faq);
		
		return faq.getId();
	}
	
//	public getListByTitle() throws Exception{
//		
//	}
}
