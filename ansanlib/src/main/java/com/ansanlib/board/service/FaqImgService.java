package com.ansanlib.board.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.board.repository.FaqImgRepository;
import com.ansanlib.book.service.FileService;
import com.ansanlib.entity.Faq;
import com.ansanlib.entity.FaqImg;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class FaqImgService {

	private final FaqImgRepository faqImgRepository;
	private final FileService fileService;

	public void saveFaqImg(Faq faq, MultipartFile faqImgFile) throws Exception {
		FaqImg faqImg = new FaqImg();
		faqImg.setFaq(faq);

		// 파일업로드
		Map<String, String> map = fileService.fileHandler(faqImgFile, "faq", faq.getId());

		String oriImgName = map.get("oriImgName");
		String imgName = map.get("imgName");
		String imgUrl = map.get("imgUrl");

		faqImg.updateFaqImg(oriImgName, imgName, imgUrl);
		faqImgRepository.save(faqImg);
	}

	public void updateFaqImg(String id, MultipartFile faqImgFile, Faq faq) throws Exception {
		
		try {
			Long imgId = Long.parseLong(id);
			
			// 기존 파일 조회
			FaqImg faqImg = faqImgRepository.findById(imgId).orElseThrow(EntityNotFoundException::new);

			// 기존 파일 삭제
			if (StringUtils.hasText(faqImg.getImgName())) {
				fileService.deleteFile(faqImg.getImgUrl());
			}

			// 새파일 등록
			Map<String, String> map = fileService.fileHandler(faqImgFile, "faq", faq.getId());
			
			String oriImgName = map.get("oriImgName");
			String imgName = map.get("imgName");
			String imgUrl = map.get("imgUrl");

			faqImg.updateFaqImg(oriImgName, imgName, imgUrl);
			
			}catch(NumberFormatException e) {
				saveFaqImg(faq, faqImgFile);
			}		

	}

	public void deleteFaq(Long id) throws Exception{
		FaqImg faqImg = faqImgRepository.findById(id).orElseThrow(EntityNotFoundException::new);
		if (StringUtils.hasText(faqImg.getImgName())) {
			fileService.deleteFile(faqImg.getImgUrl());
			faqImgRepository.deleteById(id);
		}

	}
}
