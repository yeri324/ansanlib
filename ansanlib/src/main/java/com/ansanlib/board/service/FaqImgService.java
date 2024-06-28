package com.ansanlib.board.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.board.repository.FaqImgRepository;
import com.ansanlib.book.service.FileService;
import com.ansanlib.entity.FaqImg;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class FaqImgService {

	@Value("${itemImgLocation}")
	private String itemImgLocation;

	private final FaqImgRepository faqImgRepository;
	private final FileService fileService;

	public void saveFaqImg(FaqImg faqImg, MultipartFile faqImgFile) throws Exception {
		String oriImgName = faqImgFile.getOriginalFilename();
		String imgName = "";
		String imgUrl = "";

		// 파일업로드
		if (StringUtils.hasText(oriImgName)) {
			imgName = fileService.uploadFile(itemImgLocation, oriImgName, faqImgFile.getBytes());
			imgUrl = "/Faq/" + imgName; //이미지 저장 위치
		}
		faqImg.updateFaqImg(oriImgName, imgName, imgUrl);
		faqImgRepository.save(faqImg);
	}
	
}
