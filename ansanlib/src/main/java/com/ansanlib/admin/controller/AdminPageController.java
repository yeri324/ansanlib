package com.ansanlib.admin.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.admin.dto.AdminPopupDto;
import com.ansanlib.admin.service.AdminPageService;
import com.ansanlib.entity.Popup;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/admin/popup")
public class AdminPageController {
	private final AdminPageService adminPageService;
	
	//생성
	@PostMapping
	public ResponseEntity<String> createPopup(@RequestParam MultipartFile popupImg,	 AdminPopupDto popupDto){
		return adminPageService.createPopup(popupImg,popupDto);
	}
	
	//조회
	@GetMapping
	public ResponseEntity<List<Popup>> allPopupList(){
		return adminPageService.allPopupList();
	}
	
	//조회(홈페이지) > visitController로 작성
	
	//수정
	@PutMapping
	public ResponseEntity<String> updatePopup(@RequestParam(required = false) MultipartFile popupImg, AdminPopupDto popupDto){
		System.out.println(popupImg+popupDto.getTitle()+"********");
		return adminPageService.updatePopup(popupImg,popupDto);
	}
	
	//삭제
	@DeleteMapping("/{popId}")
	public ResponseEntity<String> deletePopup(@PathVariable("popId") Long popId){
		System.out.println(popId);
		return adminPageService.deletePopup(popId);
	}
	
}
