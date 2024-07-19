package com.ansanlib.admin.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ansanlib.admin.dto.AdminPopupDto;
import com.ansanlib.admin.repository.PopupRepository;
import com.ansanlib.book.service.FileService;
import com.ansanlib.constant.PopupStatus;
import com.ansanlib.entity.Popup;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminPageService {

	private final PopupRepository popupRepository;
	private final FileService fileService;

	// 생성
	public ResponseEntity<String> createPopup(MultipartFile popupImg, AdminPopupDto popupDto) {
		Popup popup = new Popup();
		try {
			Map<String, String> saveFile = fileService.fileHandler(popupImg, "popup", null);
			String oriImgName = saveFile.get("oriImgName");
			String imgUrl = saveFile.get("imgUrl");
			popup.setImgUrl(imgUrl);
			popup.setImgName(oriImgName);
		} catch (Exception e) {
			e.printStackTrace();
		}
		popup.bind(popupDto);
		try {
			popupRepository.save(popup);
			return ResponseEntity.status(HttpStatus.OK).body("팝업이 설정되었습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("팝업 설정 중 오류가 발생했습니다.");
		}
	}

	// 조회(관리용)
	public ResponseEntity<List<Popup>> allPopupList() {
		List<Popup> popuplist = popupRepository.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(popuplist);
	}

	// 조회(홈페이지용)
	public ResponseEntity<List<Popup>> homePopupList() {
		 LocalDate today = LocalDate.now();
		List<Popup> popuplist = popupRepository.findByStartDateLessThanEqualAndEndDateGreaterThanEqualAndStatus(today,today,PopupStatus.DISPLAY);
		return ResponseEntity.status(HttpStatus.OK).body(popuplist);
	}

	// 수정
	public ResponseEntity<String> updatePopup(MultipartFile popupImg, AdminPopupDto popupDto) {
		try {
			Popup popup = popupRepository.findById(popupDto.getId()).orElseThrow(EntityNotFoundException::new);
			popup.bind(popupDto);
			if (popupImg != null) {
				try {
					fileService.deleteFile(popup.getImgUrl());
					Map<String, String> saveFile = fileService.fileHandler(popupImg, "popup", null);
					String oriImgName = saveFile.get("oriImgName");
					String imgUrl = saveFile.get("imgUrl");
					popup.setImgUrl(imgUrl);
					popup.setImgName(oriImgName);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			popupRepository.save(popup);
			return ResponseEntity.status(HttpStatus.OK).body("팝업이 수정되었습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("업데이트 중 오류가 발생했습니다.");
		}
	}

	// 삭제
	public ResponseEntity<String> deletePopup(Long popId) {
		try {
			popupRepository.deleteById(popId);
			return ResponseEntity.status(HttpStatus.OK).body("팝업이 제거되었습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("팝업 삭제 중 오류가 발생하였습니다.");
		}
	}
}
