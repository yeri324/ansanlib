package com.ansanlib.board.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.board.dto.FaqFormDto;
import com.ansanlib.board.service.FaqService;
import com.ansanlib.entity.Faq;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/faq")
@RequiredArgsConstructor
public class FaqController {

	private final FaqService faqService;

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public ResponseEntity<List<Faq>> faqList() {
		List<Faq> faqList = faqService.getFaqList();
		return ResponseEntity.ok(faqList);
	}

	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public ResponseEntity<String> faqNew(@RequestBody FaqFormDto faqFormDto) throws Exception {
		ResponseEntity<String> resEntity = null;
		try {
			faqService.saveFaq(faqFormDto);
			resEntity = new ResponseEntity("Save_OK", HttpStatus.OK);
		} catch (Exception e) {
			resEntity = new ResponseEntity("글 등록 중 에러가 발생하였습니다.",  HttpStatus.BAD_REQUEST);
		}
		return resEntity;
	}

	@RequestMapping(value = "/detail/{id}", method = RequestMethod.GET)
	public String faqDtl(@PathVariable("faqId") Long faqId, Model model) {
		try {
			Faq faq = faqService.getFaqDtl(faqId);
			model.addAttribute("faq", faq);
		} catch (EntityNotFoundException e) {
			model.addAttribute("errorMessage", "존재하지 않는 상품 입니다.");
			return "board/FaqList";
		}
		return "board/FaqDetailForm";
	}

}
