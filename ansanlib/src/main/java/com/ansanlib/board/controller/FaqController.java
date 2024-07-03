package com.ansanlib.board.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.board.dto.FaqDto;
import com.ansanlib.board.dto.FaqFormDto;
import com.ansanlib.board.service.FaqService;
import com.ansanlib.entity.Faq;
import com.ansanlib.response.CommonListResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/faq")
@RequiredArgsConstructor
public class FaqController {

	private final FaqService faqService;

	@PostMapping(value = "/new")
//	@PostMapping(value = "/new", consumes = { "multipart/form-data" })
	public ResponseEntity<String> createfaq(@RequestParam(required = false) List<MultipartFile> faqImgFile,
			FaqFormDto faqFormDto) throws Exception {

		ResponseEntity<String> resEntity = null;
		Faq faq = faqFormDto.createFaq();

		try {
			faqService.createFaq(faq, faqImgFile);
			resEntity = new ResponseEntity("Save_OK", HttpStatus.OK);
		} catch (Exception e) {
			resEntity = new ResponseEntity("글 등록 중 에러가 발생하였습니다.", HttpStatus.BAD_REQUEST);
		}
		return resEntity;
	}

	@PutMapping(value = "/detail")
	public ResponseEntity<String> updateFaq(FaqFormDto faqFormDto,
			@RequestParam(required = false) List<MultipartFile> faqImgFile,
			@RequestParam(required = false) List<String> faqImgFileId) throws Exception {
		ResponseEntity<String> resEntity = null;

		try {
			faqService.updateFaq(faqFormDto, faqImgFile, faqImgFileId);
			resEntity = new ResponseEntity("UPDATE_OK", HttpStatus.OK);
		} catch (Exception e) {
			resEntity = new ResponseEntity("글 등록 중 에러가 발생하였습니다.", HttpStatus.BAD_REQUEST);
		}
		return resEntity;
	}

	@DeleteMapping("/delete")
	public void deleteFaq(@RequestBody FaqFormDto faqFormDto) {
		ResponseEntity resEntity = null;
		List<Long> idList = faqFormDto.getIdList();
		if (idList == null) {
			faqService.deleteFaq(faqFormDto.getId());
		} else {
			try {
				for (Long id : idList) {
					faqService.deleteFaq(id);
				}
				resEntity = new ResponseEntity("DELETE_OK", HttpStatus.OK);
			} catch (Exception e) {
				resEntity = new ResponseEntity("삭제 중 에러가 발생하였습니다.", HttpStatus.BAD_REQUEST);
			}
		}
	}

	@PostMapping("/search")
	public ResponseEntity<CommonListResponse<Page<Faq>>> searchUsers(
			@RequestParam(name = "page", defaultValue = "0") int page,
	        @RequestParam(name = "size", defaultValue = "8") int size, 
	        @RequestParam FaqDto faqDto) {
		
			Page<Faq> faqs = faqService.ListFaq(page, size, faqDto);
			return ResponseEntity.ok().body(new CommonListResponse<Page<Faq>>(page, faqs));
	}

	
	@GetMapping("/count")
	public ResponseEntity<Long> totalFaqCount() {
		Long count = faqService.getTotalCount();
		return new ResponseEntity(count, HttpStatus.OK);
	}
}
