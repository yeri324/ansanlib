package com.ansanlib.board.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.board.dto.FaqDto;
import com.ansanlib.board.dto.FaqFormDto;
import com.ansanlib.board.repository.FaqImgRepository;
import com.ansanlib.board.repository.FaqRepository;
import com.ansanlib.entity.Faq;
import com.ansanlib.entity.FaqImg;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class FaqService {

	private final FaqRepository faqRepository;
	private final FaqImgRepository faqImgRepository;
	private final FaqImgService faqImgService;

	public Long createFaq(FaqFormDto faqFormDto, MultipartFile faqImgFile) throws Exception {
		Faq faq = faqFormDto.createFaq();
			faqRepository.save(faq);
			FaqImg faqImg = new FaqImg();
			faqImg.setFaq(faq);
			faqImgService.saveFaqImg(faqImg, faqImgFile);
		
		return faq.getId();
	}

	public List<Faq> getFaqList() {
		return faqRepository.findAll();
	}

	public Long updateFaq(FaqFormDto faqFormDto) {
		Faq faq = faqRepository.findById(faqFormDto.getId()).orElseThrow(EntityNotFoundException::new);
		faq.updateFaq(faqFormDto);
		faqRepository.save(faq);
		return faq.getId();
	}

	public void deleteFaq(Long id) {
		faqRepository.deleteById(id);
	}

	@Transactional(readOnly = true)
	public Faq getFaqDtl(Long faqId) {
		return faqRepository.findById(faqId).orElseThrow(EntityNotFoundException::new);
	}
	
	public List<Faq> ListFaq(FaqDto faqDto) {
		if("loginid".equals(faqDto.getSearchBy())) {
			return faqRepository.findByLibUser_LoginidContains(faqDto.getSearchQuery());
		}
		else {
			return faqRepository.findByTitleContains(faqDto.getSearchQuery());
		}

	}
}
