package com.ansanlib.board.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
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

	public Long createFaq(Faq faq, List<MultipartFile> faqImgFile) throws Exception {
		
		faqRepository.save(faq);
		
//		for(MultipartFile faqImage:faqImgFile)
//		faqImgService.saveFaqImg(faq,faqImage);

		for(int i=0; i<faqImgFile.size();i++) {
	
			faqImgService.saveFaqImg(faq, faqImgFile.get(i), i);
		}
		
		return faq.getId();
	}

	public Long updateFaq(FaqFormDto faqFormDto,@RequestParam List<MultipartFile> faqImgFile,@RequestParam List<String> faqImgFileId) throws Exception {
		// 제목/내용수정
		System.out.println("****************************");
		Faq faq = faqRepository.findById(faqFormDto.getId())
					.orElseThrow(EntityNotFoundException::new);
		faq.updateFaq(faqFormDto);
		
		
		Map<Long,MultipartFile> fileMap = new HashMap<>();
		
		faqImgFileId.forEach(str ->{
			Long key=Long.parseLong(str);
			fileMap.put(key,faqImgFile.get(faqImgFileId.indexOf(str)));
		});
		
		fileMap.forEach((key,value)->{try {
			faqImgService.updateFaqImg(key, value);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}});
		
		
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


}
