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

import com.ansanlib.board.dto.NoticeDto;
import com.ansanlib.board.dto.NoticeFormDto;
import com.ansanlib.board.repository.NoticeImgRepository;
import com.ansanlib.board.repository.NoticeRepository;
import com.ansanlib.entity.Notice;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class NoticeService {
	
	private final NoticeRepository noticeRepository;
	private final NoticeImgRepository noticeImgRepository;
	private final NoticeImgService noticeImgService;

	// faq추가
	public Long createNotice(Notice notice, List<MultipartFile> noticeImgFile) throws Exception {

		noticeRepository.save(notice);

		if (noticeImgFile != null) {
			for (MultipartFile noticeImg : noticeImgFile) {
				noticeImgService.saveNoticeImg(notice, noticeImg);
			}
		}
		return notice.getId();
	}

	// 수정하기
	public Long updatenotice(NoticeFormDto noticeFormDto, List<MultipartFile> noticeImgFile, List<String> noticeImgFileId)
			throws Exception {
		// 제목/내용수정
		Notice notice = noticeRepository.findById(noticeFormDto.getId()).orElseThrow(EntityNotFoundException::new);
		notice.updateNotice(noticeFormDto);

		// 이미지수정
		if (noticeImgFile != null) {
			Map<Long, MultipartFile> fileMap = new HashMap<>();

			noticeImgFileId.forEach(str -> {
				Long key = Long.parseLong(str);
				fileMap.put(key, noticeImgFile.get(noticeImgFileId.indexOf(str)));
			});

			fileMap.forEach((key, value) -> {
				try {
					noticeImgService.updateNoticeImg(key, value, notice);
				} catch (Exception e) {
					e.printStackTrace();
				}
			});

		}
		return notice.getId();
	}

	// 삭제하기
	public void deleteNotice(Long id) {
		noticeRepository.deleteById(id);
	}
	
	public Notice getDetail(NoticeDto noticeDto) {
		Notice notice = noticeRepository.findById(noticeDto.getId()).orElseThrow(EntityNotFoundException::new);
		return 	notice;
	}
	
	// 기준 검색하기 or 전체 리스트 가져오기
	public Page<Notice> ListNotice(NoticeDto noticeDto) {
		Pageable pageable = PageRequest.of(noticeDto.getPage(), noticeDto.getSize(), Sort.by(Order.desc("regTime")));

		if ("loginid".equals(noticeDto.getSearchBy()) && noticeDto.getSearchQuery() != null) {
			return noticeRepository.findByLibUser_LoginidContains(noticeDto.getSearchQuery(), pageable);
		} else if ("title".equals(noticeDto.getSearchBy()) && noticeDto.getSearchQuery() != null) {
			return noticeRepository.findByTitleContains(noticeDto.getSearchQuery(), pageable);
		} else {
			return noticeRepository.findAll(pageable);
		}
	}

}
