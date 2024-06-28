package com.ansanlib.board.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.board.dto.FaqDto;
import com.ansanlib.board.dto.FaqFormDto;
import com.ansanlib.board.service.FaqService;
import com.ansanlib.entity.Faq;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/faq")
@RequiredArgsConstructor
public class FaqController {

	private final FaqService faqService;

//	@RequestMapping(value = "/list", method = RequestMethod.GET)
//	public ResponseEntity<List<Faq>> faqList() {
//		List<Faq> faqList = faqService.getFaqList();
//		return ResponseEntity.ok(faqList);
//	}


	@PostMapping(value = "/new", consumes = { "multipart/form-data" })
	public ResponseEntity<String> createfaq( 
			  @RequestParam MultipartFile faqImgFile, FaqFormDto faqFormDto) throws Exception{
		ResponseEntity<String> resEntity = null;		
		try {
			faqService.createFaq(faqFormDto, faqImgFile);
			resEntity = new ResponseEntity("Save_OK", HttpStatus.OK);
		} catch (Exception e) {
			resEntity = new ResponseEntity("글 등록 중 에러가 발생하였습니다.", HttpStatus.BAD_REQUEST);
		}
		return resEntity;
	}

	@RequestMapping(value = "/detail", method = RequestMethod.PUT)
	public ResponseEntity<String> updateFaq(@RequestBody FaqFormDto faqFormDto) throws Exception {
		ResponseEntity<String> resEntity = null;
		try {
			faqService.updateFaq(faqFormDto);
			resEntity = new ResponseEntity("UPDATE_OK", HttpStatus.OK);
		} catch (Exception e) {
			resEntity = new ResponseEntity("글 등록 중 에러가 발생하였습니다.", HttpStatus.BAD_REQUEST);
		}
		return resEntity;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.DELETE)
	public void deleteFaq( @RequestParam MultipartFile faqImgFile, FaqFormDto faqFormDto){
		ResponseEntity resEntity = null;
		List<Long> idList = faqFormDto.getIdList();
		try {
			for(Long id : idList) {faqService.deleteFaq(id);}
			resEntity = new ResponseEntity("DELETE_OK", HttpStatus.OK);
		} catch (Exception e) {
			resEntity = new ResponseEntity("삭제 중 에러가 발생하였습니다.", HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/search")
    public ResponseEntity<List<Faq>> searchUsers(@RequestBody FaqDto faqDto) {
        List<Faq> faqs = faqService.ListFaq(faqDto);
        return ResponseEntity.ok(faqs);
    }
	
}
