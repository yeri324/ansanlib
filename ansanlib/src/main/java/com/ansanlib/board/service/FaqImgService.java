package com.ansanlib.board.service;

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

	@Value("${itemImgLocation}")
	private String itemImgLocation;

	private final FaqImgRepository faqImgRepository;
	private final FileService fileService;

	public void saveFaqImg(Faq faq, MultipartFile faqImgFile) throws Exception {
		FaqImg faqImg = new FaqImg();
		faqImg.setFaq(faq);
		
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
	
	public void updateFaqImg(Long id, MultipartFile faqImgFile,Faq faq) throws Exception {
		 	
		Optional<FaqImg> checkImg = faqImgRepository.findByFaq_IdAndId(faq.getId(), id);
		
		 if(checkImg.isEmpty()){
			 saveFaqImg(faq, faqImgFile);
		 }
		 else {
			//기존 파일 조회
			FaqImg faqImg = faqImgRepository.findById(id)
							.orElseThrow(EntityNotFoundException::new);
			
			//기존 파일 삭제
			if(StringUtils.hasText(faqImg.getImgName())) {
				fileService.deleteFile(itemImgLocation + "/" + faqImg.getImgName());
			}
			
			// 새파일 등록
			String oriImgName = faqImgFile.getOriginalFilename();
			String imgName = fileService.uploadFile(itemImgLocation, oriImgName, faqImgFile.getBytes());
			String imgUrl = "/Faq/" + imgName;
			faqImg.updateFaqImg(oriImgName, imgName, imgUrl);
		}
	}
	
}
