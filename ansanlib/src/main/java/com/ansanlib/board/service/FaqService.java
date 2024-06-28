package com.ansanlib.board.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.board.dto.FaqDto;
import com.ansanlib.board.dto.FaqFormDto;
import com.ansanlib.board.dto.FaqImgDto;
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

	public Long updateFaq(FaqFormDto faqFormDto) {
		Faq faq = faqRepository.findById(faqFormDto.getId()).orElseThrow(EntityNotFoundException::new);
		faq.updateFaq(faqFormDto);
		faqRepository.save(faq);
		return faq.getId();
	}

	public void deleteFaq(Long id) {
		faqRepository.deleteById(id);
	}

	public List<Faq> ListFaq(FaqDto faqDto) {
		if ("loginid".equals(faqDto.getSearchBy())) {
			return faqRepository.findByLibUser_LoginidContains(faqDto.getSearchQuery());
		} else {
			return faqRepository.findByTitleContains(faqDto.getSearchQuery());
		}
	}

	@Transactional(readOnly = true)
	public FaqFormDto getFaqDtl(Long id) {
		List<FaqImg> faqImgList = faqImgRepository.findByFaq_IdOrderByIdAsc(id); // 해당 상품 이미지 조회
		List<FaqImgDto> faqImgDtoList = new ArrayList<>();
		for (FaqImg faqImg : faqImgList) { // 조회한 ItemImg 엔티티를 ItemImgDto 객체로 만들어서 리스트에 추가한다.
			FaqImgDto faqImgDto = FaqImgDto.of(faqImg);
			faqImgDtoList.add(faqImgDto);
		}
		Faq faq = faqRepository.findById(id) // 상품 아이디를 통해 상품 엔티티를 조회한다. 존재하지 않을 땐 예외를 발생시킨다.
				.orElseThrow(EntityNotFoundException::new);
		FaqFormDto faqFormDto = FaqFormDto.of(faq);
		faqFormDto.setFaqImgDtoList(faqImgDtoList);
		return faqFormDto;
		}
}
