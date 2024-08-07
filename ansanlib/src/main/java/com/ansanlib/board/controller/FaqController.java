package com.ansanlib.board.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.board.dto.FaqDto;
import com.ansanlib.board.dto.FaqFormDto;
import com.ansanlib.board.dto.FaqImgDto;
import com.ansanlib.board.service.FaqImgService;
import com.ansanlib.board.service.FaqService;
import com.ansanlib.book.service.FileService;
import com.ansanlib.entity.Faq;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class FaqController {

	private final FaqService faqService;
	private final FileService fileService;
	private final FaqImgService faqImgService;

	// 생성
	@Secured("ROLE_ADMIN")
	@PostMapping(value = "/admin/faq/new")
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

	// 수정
	@Secured("ROLE_ADMIN")
	@PutMapping(value = "/admin/faq/update")
	public ResponseEntity<String> updateFaq(FaqFormDto faqFormDto,
			@RequestParam(required = false) List<MultipartFile> faqImgFile,
			@RequestParam(required = false) List<String> faqImgFileId,
			@RequestParam(required = false) List<String> delImg) throws Exception {
		ResponseEntity<String> resEntity = null;

		try {
			faqService.updateFaq(faqFormDto, faqImgFile, faqImgFileId, delImg);
			resEntity = new ResponseEntity("UPDATE_OK", HttpStatus.OK);
		} catch (Exception e) {
			resEntity = new ResponseEntity("글 등록 중 에러가 발생하였습니다.", HttpStatus.BAD_REQUEST);
		}
		return resEntity;
	}

	// 삭제
	@Secured("ROLE_ADMIN")
	@DeleteMapping("/admin/faq/delete")
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

	// 검색
	@PostMapping("/faq/search")
	public Page<Faq> searchUsers(@RequestBody FaqDto faqDto) {
		Page<Faq> faqs = faqService.ListFaq(faqDto);
		return faqs;
	}

	// 디테일 정보 가져오기
	@PostMapping("/faq/detail")
	public ResponseEntity<String> detailFaq(@RequestBody FaqDto faqDto) {
		ResponseEntity resEntity = null;
		Faq faq = faqService.getDetail(faqDto);
		resEntity = new ResponseEntity(faq, HttpStatus.OK);
		return resEntity;
	}
	
	// 조회 수 카운트
	@PostMapping("/faq/count")
	public ResponseEntity<String> countFaq(@RequestBody FaqDto faqDto){
		ResponseEntity resEntity = null;
		Faq faq = faqService.getCount(faqDto);
		resEntity = new ResponseEntity(faq, HttpStatus.OK);
		return resEntity;
	}
	
	
	// 이미지 미리보기
	@PostMapping("/getImg")
	public ResponseEntity<byte[]> getFaqImage(@RequestBody FaqImgDto faqImgDto) {
		try {
			byte[] imgBytes = fileService.getImgByte(faqImgDto.getImgUrl());

			if (imgBytes != null && imgBytes.length > 0) {
				HttpHeaders headers = new HttpHeaders();
				headers.setContentType(MediaType.IMAGE_JPEG);
				return new ResponseEntity<>(imgBytes, headers, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

}
