package com.ansanlib.board.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.board.dto.FaqDto;
import com.ansanlib.board.dto.FaqFormDto;
import com.ansanlib.board.repository.FaqImgRepository;
import com.ansanlib.board.repository.FaqRepository;
import com.ansanlib.entity.Faq;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class FaqService {

	private final FaqRepository faqRepository;
	private final FaqImgRepository faqImgRepository;
	private final FaqImgService faqImgService;

	// faq추가
	public Long createFaq(Faq faq, List<MultipartFile> faqImgFile) throws Exception {

		faqRepository.save(faq);

		if (faqImgFile != null) {
			for (MultipartFile faqImg : faqImgFile) {
				faqImgService.saveFaqImg(faq, faqImg);
			}
		}

		return faq.getId();
	}

	// 수정하기
	public Long updateFaq(FaqFormDto faqFormDto, List<MultipartFile> faqImgFile, List<String> faqImgFileId,
			List<String> delImg) throws Exception {

		// 이미지삭제
		if (delImg != null) {
			delImg.forEach(imgId -> {
				Long id = Long.parseLong(imgId);
				try {
					faqImgService.deleteFaq(id);
				} catch (Exception e) {
					e.printStackTrace();
				}
			});
		}

		// 제목/내용수정
		Faq faq = faqRepository.findById(faqFormDto.getId()).orElseThrow(EntityNotFoundException::new);
		faq.updateFaq(faqFormDto);

		// 이미지수정
		if (faqImgFile != null) {
			Map<String, MultipartFile> fileMap = new HashMap<>();

			faqImgFileId.forEach(key -> {
				fileMap.put(key, faqImgFile.get(faqImgFileId.indexOf(key)));
			});

			fileMap.forEach((key, value) -> {
				try {
					faqImgService.updateFaqImg(key, value, faq);
				} catch (Exception e) {
					e.printStackTrace();
				}
			});

		}
		return faq.getId();
	}

	// 삭제하기
	public void deleteFaq(Long id) {
		faqRepository.deleteById(id);
	}

	public Faq getDetail(FaqDto faqDto) {
		Faq faq = faqRepository.findById(faqDto.getId()).orElseThrow(EntityNotFoundException::new);
		return faq;
	}

	// 기준 검색하기 or 전체 리스트 가져오기
	public Page<Faq> ListFaq(FaqDto faqDto) {
		Pageable pageable = PageRequest.of(faqDto.getPage(), faqDto.getSize(), Sort.by(Order.desc("regTime")));

		if ("loginid".equals(faqDto.getSearchBy()) && faqDto.getSearchQuery() != null) {
			return faqRepository.findByLibUser_LoginidContains(faqDto.getSearchQuery(), pageable);
		} else if ("title".equals(faqDto.getSearchBy()) && faqDto.getSearchQuery() != null) {
			return faqRepository.findByTitleContains(faqDto.getSearchQuery(), pageable);
		} else {
			return faqRepository.findAll(pageable);
		}
	}

}
