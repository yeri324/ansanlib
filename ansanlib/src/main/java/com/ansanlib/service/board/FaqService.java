package com.ansanlib.service.board;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.dto.board.FaqDto;
import com.ansanlib.dto.board.FaqFormDto;
import com.ansanlib.entity.Faq;
import com.ansanlib.repository.board.FaqRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class FaqService {

	private final FaqRepository faqRepository;

	public Long createFaq(FaqFormDto faqFormDto) {
		Faq faq = faqFormDto.createFaq();
		faqRepository.save(faq);
		return faq.getId();
	}

	public List<Faq> getFaqList() {
		return faqRepository.findAll();
	}

//	public void updateFaq(FaqFormDto faqFormDto) {
//		return faqRepository.save(faqFormDto);
//	}

	public void delete(Faq faq) {
		this.faqRepository.delete(faq);
	}

	@Transactional(readOnly = true) 
	public Faq getFaqDtl(Long faqId){ 
		return faqRepository.findById(faqId)
					.orElseThrow(EntityNotFoundException::new);
		
}
	}
