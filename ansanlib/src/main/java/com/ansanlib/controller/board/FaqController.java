package com.ansanlib.controller.board;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.ansanlib.dto.board.FaqDto;
import com.ansanlib.dto.board.FaqFormDto;
import com.ansanlib.entity.Faq;
import com.ansanlib.service.board.FaqService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class FaqController {

	private final FaqService faqService;

	@GetMapping(value = "/faqlist")
	public String faqList(Model model) {
		List<Faq> faqList = faqService.getFaqList();
		model.addAttribute("faqList", faqList);
		return "board/FaqList";
	}

	@GetMapping(value = "/faq/new")
	public String faqNew(Model model) throws Exception {
		model.addAttribute("FaqFormDto", new FaqFormDto());
		return "board/FaqForm";
	}

	@PostMapping(value = "/faq/new")
	public String faqNew(FaqFormDto faqFormDto, Model model) throws Exception {
		try {
			faqService.saveFaq(faqFormDto);
			List<Faq> faqList = faqService.getFaqList();
			model.addAttribute("faqList", faqList);

		} catch (Exception e) {
			model.addAttribute("errorMessage", "글 등록 중 에러가 발생하였습니다.");
			return "board/FaqForm";
		}
		return "board/FaqList";
	}

	@GetMapping(value = "/faq/detail/{faqId}")
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
