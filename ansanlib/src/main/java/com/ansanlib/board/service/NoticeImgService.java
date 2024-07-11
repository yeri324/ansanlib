package com.ansanlib.board.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.board.repository.NoticeImgRepository;
import com.ansanlib.book.service.FileService;
import com.ansanlib.entity.NoticeImg;
import com.ansanlib.entity.Notice;
import com.ansanlib.entity.NoticeImg;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class NoticeImgService {
	
	private final NoticeImgRepository noticeImgRepository;
	private final FileService fileService;

	public void saveNoticeImg(Notice notice, MultipartFile noticeImgFile) throws Exception {
		NoticeImg noticeImg = new NoticeImg();
		noticeImg.setNotice(notice);

		// 파일업로드
		Map<String, String> map = fileService.fileHandler(noticeImgFile, "notice", notice.getId());

		String oriImgName = map.get("oriImgName");
		String imgName = map.get("imgName");
		String imgUrl = map.get("imgUrl");

		noticeImg.updateNoticeImg(oriImgName, imgName, imgUrl);
		noticeImgRepository.save(noticeImg);
	}

	public void updateNoticeImg(String id, MultipartFile noticeImgFile, Notice notice) throws Exception {
		try {
			Long imgId = Long.parseLong(id);
			
			// 기존 파일 조회
			NoticeImg noticeImg = noticeImgRepository.findById(imgId).orElseThrow(EntityNotFoundException::new);

			// 기존 파일 삭제
			if (StringUtils.hasText(noticeImg.getImgName())) {
				fileService.deleteFile(noticeImg.getImgUrl());
			}

			// 새파일 등록
			Map<String, String> map = fileService.fileHandler(noticeImgFile, "notice", notice.getId());
			
			String oriImgName = map.get("oriImgName");
			String imgName = map.get("imgName");
			String imgUrl = map.get("imgUrl");

			noticeImg.updateNoticeImg(oriImgName, imgName, imgUrl);
			
			}catch(NumberFormatException e) {
				saveNoticeImg(notice, noticeImgFile);
			}		

	}

	public void deleteNotice(Long id) throws Exception{
		NoticeImg noticeImg = noticeImgRepository.findById(id).orElseThrow(EntityNotFoundException::new);
		if (StringUtils.hasText(noticeImg.getImgName())) {
			fileService.deleteFile(noticeImg.getImgUrl());
			noticeImgRepository.deleteById(id);
		}

	}
}
