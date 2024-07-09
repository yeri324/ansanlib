package com.ansanlib.board.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.board.repository.BoardImgRepository;
import com.ansanlib.book.service.FileService;
import com.ansanlib.entity.Board;
import com.ansanlib.entity.BoardImg;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardImgService {
	
	private final BoardImgRepository boardImgRepository;
	private final FileService fileService;

	public void saveBoardImg(Board board, MultipartFile boardImgFile) throws Exception {
		BoardImg boardImg = new BoardImg();
		boardImg.setBoard(board);

		// 파일업로드
		Map<String, String> map = fileService.fileHandler(boardImgFile, "board", board.getId());

		String oriImgName = map.get("oriImgName");
		String imgName = map.get("imgName");
		String imgUrl = map.get("imgUrl");

		boardImg.updateBoardImg(oriImgName, imgName, imgUrl);
		boardImgRepository.save(boardImg);
	}

	public void updateBoardImg(Long id, MultipartFile boardImgFile, Board board) throws Exception {

		Optional<BoardImg> checkImg = boardImgRepository.findByBoard_IdAndId(board.getId(), id);

		if (checkImg.isEmpty()) {
			saveBoardImg(board, boardImgFile);
		} else {
			// 기존 파일 조회
			BoardImg boardImg = boardImgRepository.findById(id).orElseThrow(EntityNotFoundException::new);

			// 기존 파일 삭제
			if (StringUtils.hasText(boardImg.getImgName())) {
				fileService.deleteFile(boardImg.getImgUrl());
			}

			// 새파일 등록
			Map<String, String> map = fileService.fileHandler(boardImgFile, "board", board.getId());

			String oriImgName = map.get("oriImgName");
			String imgName = map.get("imgName");
			String imgUrl = map.get("imgUrl");

			boardImg.updateBoardImg(oriImgName, imgName, imgUrl);

		}
	}

	public void deleteBoard(Long id) throws Exception{
		BoardImg boardImg = boardImgRepository.findById(id).orElseThrow(EntityNotFoundException::new);
		if (StringUtils.hasText(boardImg.getImgName())) {
			fileService.deleteFile(boardImg.getImgUrl());
			boardImgRepository.deleteById(id);
		}

	}
}
