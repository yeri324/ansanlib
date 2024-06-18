package com.ansanlib.service.board;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
	
	public List<Faq> getFaqList(){
		return faqRepository.findAll();
	}

}
