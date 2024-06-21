package com.ansanlib.board.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.board.dto.FaqFormDto;
import com.ansanlib.board.repository.FaqRepository;
import com.ansanlib.entity.Faq;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class FaqService {

	private final FaqRepository faqRepository;

	public Long saveFaq(FaqFormDto faqFormDto) {
		Faq faq = faqFormDto.createFaq();
		faqRepository.save(faq);
		return faq.getId();
	}

	public List<Faq> getFaqList() {
		return faqRepository.findAll();
	}

	public void modify(FaqFormDto faqFormDto) {
		return;
	}

	public void delete(Faq faq) {
		this.faqRepository.delete(faq);
	}

	@Transactional(readOnly = true) 
	public Faq getFaqDtl(Long faqId){ 
		return faqRepository.findById(faqId)
					.orElseThrow(EntityNotFoundException::new);
		
}
	}