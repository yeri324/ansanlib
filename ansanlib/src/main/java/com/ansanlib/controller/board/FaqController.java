package com.ansanlib.controller.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.dto.board.FaqFormDto;
import com.ansanlib.entity.Faq;
import com.ansanlib.service.board.FaqService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/faq")
@RequiredArgsConstructor
public class FaqController {

	private final FaqService faqService;

	//FAQ 리스트 가져오기
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public ResponseEntity<List<Faq>> faqList() {
		List<Faq> faqList = faqService.getFaqList();
		return ResponseEntity.ok(faqList);
	}

	//FAQ 생성하기
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public ResponseEntity<String> faqNew(@RequestBody FaqFormDto faqFormDto) throws Exception {
		ResponseEntity<String> resEntity = null;
		try {
			faqService.createFaq(faqFormDto);
			resEntity = new ResponseEntity("Save_OK", HttpStatus.OK);
		} catch (Exception e) {
			resEntity = new ResponseEntity("글 등록 중 에러가 발생하였습니다.",  HttpStatus.BAD_REQUEST);
		}
		return resEntity;
	}

	//FAQ 상세페이지 가져오기
	@RequestMapping(value = "/detail/{id}", method = RequestMethod.GET)
	public ResponseEntity<String> faqDtl(@PathVariable("faqId") Long faqId) {
		ResponseEntity<String> resEntity = null;
		try {
			faqService.getFaqDtl(faqId);
			System.out.println("*****");
			resEntity = new ResponseEntity("글 상세 가져오기", HttpStatus.OK);
		} catch (EntityNotFoundException e) {
			return resEntity = new ResponseEntity("없는 글입니다.",  HttpStatus.BAD_REQUEST);
		}
		return resEntity;
	}
	
	//FAQ 수정하기
	@RequestMapping(value = "/detail/{id}", method = RequestMethod.PUT)
	public ResponseEntity<String> updateFaq(@PathVariable("faqId") Long faqId, @RequestBody FaqFormDto faqFormDto) {
		ResponseEntity<String> resEntity = null;
		try {
//			faqService.updateFaq(faqFormDto);
			resEntity = new ResponseEntity("Update_OK", HttpStatus.OK);
		} catch (EntityNotFoundException e) {
			return resEntity = new ResponseEntity("수정에 실패하였습니다.",  HttpStatus.BAD_REQUEST);
		}
		return resEntity;
	}

}
