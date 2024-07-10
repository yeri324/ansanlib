package com.ansanlib.board.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.board.dto.NoticeDto;
import com.ansanlib.board.dto.NoticeFormDto;
import com.ansanlib.board.dto.NoticeImgDto;
import com.ansanlib.board.service.NoticeImgService;
import com.ansanlib.board.service.NoticeService;
import com.ansanlib.book.service.FileService;
import com.ansanlib.entity.Notice;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
public class NoticeController {

	private final NoticeService noticeService;
	private final FileService fileService;
	private final NoticeImgService noticeImgService;

	//생성
	@PostMapping(value = "/new")
	public ResponseEntity<String> createNotice(@RequestParam(required = false) List<MultipartFile> noticeImgFile,
			NoticeFormDto noticeFormDto) throws Exception {

		ResponseEntity<String> resEntity = null;
		Notice notice = noticeFormDto.createNotice();

		try {
			noticeService.createNotice(notice, noticeImgFile);
			resEntity = new ResponseEntity("Save_OK", HttpStatus.OK);
		} catch (Exception e) {
			resEntity = new ResponseEntity("글 등록 중 에러가 발생하였습니다.", HttpStatus.BAD_REQUEST);
		}
		return resEntity;
	}

	//수정
	@PutMapping(value = "/update")
	public ResponseEntity<String> updatenotice(NoticeFormDto noticeFormDto,
			@RequestParam(required = false) List<MultipartFile> noticeImgFile,
			@RequestParam(required = false) List<String> noticeImgFileId) throws Exception {
		ResponseEntity<String> resEntity = null;

		try {
			noticeService.updateNotice(noticeFormDto, noticeImgFile, noticeImgFileId);
			resEntity = new ResponseEntity("UPDATE_OK", HttpStatus.OK);
		} catch (Exception e) {
			resEntity = new ResponseEntity("글 등록 중 에러가 발생하였습니다.", HttpStatus.BAD_REQUEST);
		}
		return resEntity;
	}

	//글 삭제
	@DeleteMapping("/delete")
	public void deleteNotice(@RequestBody NoticeFormDto noticeFormDto) {
		ResponseEntity resEntity = null;
		List<Long> idList = noticeFormDto.getIdList();
		if (idList == null) {
			noticeService.deleteNotice(noticeFormDto.getId());
		} else {
			try {
				for (Long id : idList) {
					noticeService.deleteNotice(id);
				}
				resEntity = new ResponseEntity("DELETE_OK", HttpStatus.OK);
			} catch (Exception e) {
				resEntity = new ResponseEntity("삭제 중 에러가 발생하였습니다.", HttpStatus.BAD_REQUEST);
			}
		}
	}
	
	// 검색
	@PostMapping("/search")
	public Page<Notice> searchUsers(@RequestBody NoticeDto noticeDto) {
		
		Page<Notice> notices= noticeService.ListNotice(noticeDto);
			System.out.println(notices.getSize());
			return notices;
		}
	
	//디테일 정보 가져오기
	@PostMapping("/detail")
	public ResponseEntity<String> detailnotice(@RequestBody NoticeDto noticeDto){
		ResponseEntity resEntity = null;
		Notice notice = noticeService.getDetail(noticeDto);
		resEntity = new ResponseEntity(notice, HttpStatus.OK);
		return resEntity;
		
	}
	
	//이미지 미리보기
	@PostMapping("/getImg")
	public ResponseEntity<byte[]> getnoticeImage(@RequestBody NoticeImgDto noticeImgDto){
		try {
			byte[] imgBytes = fileService.getImgByte(noticeImgDto.getImgUrl());
			
			if(imgBytes!=null && imgBytes.length>0) {
				HttpHeaders headers = new HttpHeaders();
				headers.setContentType(MediaType.IMAGE_JPEG);
				return new ResponseEntity<>(imgBytes,headers,HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	// 이미지 삭제
	@DeleteMapping("/imgDelete")
	public ResponseEntity<String> deleteImg(@RequestBody NoticeImgDto noticeImgDto) throws Exception {
		ResponseEntity resEntity = null;
		Long id = noticeImgDto.getId();
		System.out.println(id);
		noticeImgService.deleteNotice(id);
		resEntity = new ResponseEntity("IMG DELETE_OK", HttpStatus.OK);
		return resEntity;
	}
}
