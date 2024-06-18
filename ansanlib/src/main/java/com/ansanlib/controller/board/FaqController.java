package com.ansanlib.controller.board;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.ansanlib.dto.board.FaqFormDto;
import com.ansanlib.entity.Faq;
import com.ansanlib.service.board.FaqService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class FaqController {

	private final FaqService faqService;
	
	@GetMapping(value="/faqlist")
	public String faqList(Model model) {
		List<Faq> faqList = faqService.getFaqList();
		model.addAttribute("faqList", faqList);
		return "FaqList";
	}
	
	@GetMapping(value="/faq/new")
	public String faqNew(Model model) throws Exception{
		model.addAttribute("FaqFormDto", new FaqFormDto());
		return "FaqForm";
	}
	
	@PostMapping(value="/faq/new")
	public String faqNew(FaqFormDto faqFormDto, Model model) throws Exception{
		try {
			faqService.saveFaq(faqFormDto);
		} catch(Exception e) {
			model.addAttribute("errorMessage", "글 등록 중 에러가 발생하였습니다.");
			return "FaqForm";
		}
		return "FaqList";
	}
	
}
