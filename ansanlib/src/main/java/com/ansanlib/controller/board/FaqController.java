package com.ansanlib.controller.board;

import java.util.List;
<<<<<<< HEAD
=======

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
>>>>>>> d247e59 (목록조회 기능 커밋)

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

<<<<<<< HEAD
import com.ansanlib.dto.board.FaqFormDto;
import com.ansanlib.entity.Faq;
<<<<<<< HEAD
=======
>>>>>>> main
=======
>>>>>>> d247e59 (목록조회 기능 커밋)
import com.ansanlib.service.board.FaqService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class FaqController {

	private final FaqService faqService;
	
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d247e59 (목록조회 기능 커밋)
	@GetMapping(value="/faqlist")
	public String faqList(Model model) {
		List<Faq> faqList = faqService.getFaqList();
		model.addAttribute("faqList", faqList);
		return "FaqList";
	}
	
//	@PostMapping(value="/faqlist")
//	public String faqList(Model model) {
//		List<Faq> faqList = faqService.getFaqList();
//		model.addAttribute("faqList", faqList);
//		return "FaqList";
//	}
	
	@GetMapping(value="/faq/new")
	public String faqNew(Model model) throws Exception{
		model.addAttribute("FaqFormDto", new FaqFormDto());
		return "FaqForm";
	}
	
	@PostMapping(value="/faq/new")
	public String faqNew(FaqFormDto faqFormDto, Model model) throws Exception{
		try {
			faqService.saveFaq(faqFormDto);
			List<Faq> faqList = faqService.getFaqList();
			model.addAttribute("faqList", faqList);
			
		} catch(Exception e) {
			model.addAttribute("errorMessage", "글 등록 중 에러가 발생하였습니다.");
			return "FaqForm";
		}
		return "FaqList";
	}
	
=======
>>>>>>> main
}
