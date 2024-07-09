package com.ansanlib.board.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.board.dto.BoardDto;
import com.ansanlib.board.dto.BoardFormDto;
import com.ansanlib.board.repository.BoardImgRepository;
import com.ansanlib.board.repository.BoardRepository;
import com.ansanlib.entity.Board;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {
	
	private final BoardRepository boardRepository;
	private final BoardImgRepository boardImgRepository;
	private final BoardImgService boardImgService;

	// faq추가
	public Long createBoard(Board board, List<MultipartFile> boardImgFile) throws Exception {

		boardRepository.save(board);

		if (boardImgFile != null) {
			for (MultipartFile boardImg : boardImgFile) {
				boardImgService.saveBoardImg(board, boardImg);
			}
		}
		return board.getId();
	}

	// 수정하기
	public Long updateBoard(BoardFormDto boardFormDto, List<MultipartFile> boardImgFile, List<String> boardImgFileId)
			throws Exception {
		// 제목/내용수정
		Board board = boardRepository.findById(boardFormDto.getId()).orElseThrow(EntityNotFoundException::new);
		board.updateBoard(boardFormDto);

		// 이미지수정
		if (boardImgFile != null) {
			Map<Long, MultipartFile> fileMap = new HashMap<>();

			boardImgFileId.forEach(str -> {
				Long key = Long.parseLong(str);
				fileMap.put(key, boardImgFile.get(boardImgFileId.indexOf(str)));
			});

			fileMap.forEach((key, value) -> {
				try {
					boardImgService.updateBoardImg(key, value, board);
				} catch (Exception e) {
					e.printStackTrace();
				}
			});

		}
		return board.getId();
	}

	// 삭제하기
	public void deleteBoard(Long id) {
		boardRepository.deleteById(id);
	}
	
	public Board getDetail(BoardDto boardDto) {
		Board board = boardRepository.findById(boardDto.getId()).orElseThrow(EntityNotFoundException::new);
		return 	board;
	}
	
	// 기준 검색하기 or 전체 리스트 가져오기
	public Page<Board> ListBoard(BoardDto boardDto) {
		Pageable pageable = PageRequest.of(boardDto.getPage(), boardDto.getSize(), Sort.by(Order.desc("regTime")));

		if ("loginid".equals(boardDto.getSearchBy()) && boardDto.getSearchQuery() != null) {
			return boardRepository.findByLibUser_LoginidContains(boardDto.getSearchQuery(), pageable);
		} else if ("title".equals(boardDto.getSearchBy()) && boardDto.getSearchQuery() != null) {
			return boardRepository.findByTitleContains(boardDto.getSearchQuery(), pageable);
		} else {
			return boardRepository.findAll(pageable);
		}
	}

}
