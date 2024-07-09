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

import com.ansanlib.board.dto.BoardDto;
import com.ansanlib.board.dto.BoardFormDto;
import com.ansanlib.board.dto.BoardImgDto;
import com.ansanlib.board.service.BoardImgService;
import com.ansanlib.board.service.BoardService;
import com.ansanlib.book.service.FileService;
import com.ansanlib.entity.Board;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

	private final BoardService boardService;
	private final FileService fileService;
	private final BoardImgService boardImgService;

	//생성
	@PostMapping(value = "/new")
	public ResponseEntity<String> createBoard(@RequestParam(required = false) List<MultipartFile> boardImgFile,
			BoardFormDto boardFormDto) throws Exception {

		ResponseEntity<String> resEntity = null;
		Board board = boardFormDto.createBoard();

		try {
			boardService.createBoard(board, boardImgFile);
			resEntity = new ResponseEntity("Save_OK", HttpStatus.OK);
		} catch (Exception e) {
			resEntity = new ResponseEntity("글 등록 중 에러가 발생하였습니다.", HttpStatus.BAD_REQUEST);
		}
		return resEntity;
	}

	//수정
	@PutMapping(value = "/update")
	public ResponseEntity<String> updateBoard(BoardFormDto boardFormDto,
			@RequestParam(required = false) List<MultipartFile> boardImgFile,
			@RequestParam(required = false) List<String> boardImgFileId) throws Exception {
		ResponseEntity<String> resEntity = null;

		try {
			boardService.updateBoard(boardFormDto, boardImgFile, boardImgFileId);
			resEntity = new ResponseEntity("UPDATE_OK", HttpStatus.OK);
		} catch (Exception e) {
			resEntity = new ResponseEntity("글 등록 중 에러가 발생하였습니다.", HttpStatus.BAD_REQUEST);
		}
		return resEntity;
	}

	//글 삭제
	@DeleteMapping("/delete")
	public void deleteBoard(@RequestBody BoardFormDto boardFormDto) {
		ResponseEntity resEntity = null;
		List<Long> idList = boardFormDto.getIdList();
		if (idList == null) {
			boardService.deleteBoard(boardFormDto.getId());
		} else {
			try {
				for (Long id : idList) {
					boardService.deleteBoard(id);
				}
				resEntity = new ResponseEntity("DELETE_OK", HttpStatus.OK);
			} catch (Exception e) {
				resEntity = new ResponseEntity("삭제 중 에러가 발생하였습니다.", HttpStatus.BAD_REQUEST);
			}
		}
	}
	
	// 검색
	@PostMapping("/search")
	public Page<Board> searchUsers(@RequestBody BoardDto boardDto) {
		
		Page<Board> boards= boardService.ListBoard(boardDto);
			System.out.println(boards.getSize());
			return boards;
		}
	
	//디테일 정보 가져오기
	@PostMapping("/detail")
	public ResponseEntity<String> detailBoard(@RequestBody BoardDto boardDto){
		ResponseEntity resEntity = null;
		Board board = boardService.getDetail(boardDto);
		resEntity = new ResponseEntity(board, HttpStatus.OK);
		return resEntity;
		
	}
	
	//이미지 미리보기
	@PostMapping("/getImg")
	public ResponseEntity<byte[]> getBoardImage(@RequestBody BoardImgDto boardImgDto){
		try {
			byte[] imgBytes = fileService.getImgByte(boardImgDto.getImgUrl());
			
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
	public ResponseEntity<String> deleteImg(@RequestBody BoardImgDto boardImgDto) throws Exception {
		ResponseEntity resEntity = null;
		Long id = boardImgDto.getId();
		System.out.println(id);
		boardImgService.deleteBoard(id);
		resEntity = new ResponseEntity("IMG DELETE_OK", HttpStatus.OK);
		return resEntity;
	}
}
