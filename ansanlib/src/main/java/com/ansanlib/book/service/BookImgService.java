package com.ansanlib.book.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.util.StringUtils;

import com.ansanlib.book.repository.BookImgRepository;
import com.ansanlib.entity.BookImg;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BookImgService {
	
	@Value("${bookImgLocation}")
	private String bookImgLocation;
	
	private final BookImgRepository bookImgRepository;
	private final FileService fileService;
	
	public void saveBookImg(BookImg bookImg, MultipartFile bookImgFile)throws Exception{
		String oriImgName = bookImgFile.getOriginalFilename();
		String imgName = "";
		String imgUrl = "";
		
		if(!StringUtils.isEmpty(oriImgName)) {
			imgName = fileService.uploadFile(bookImgLocation, oriImgName, bookImgFile.getBytes());
			imgUrl = "/images/book/" + imgName;
		}
		
		bookImg.updateBookImg(oriImgName, imgName, imgUrl);
		bookImgRepository.save(bookImg);
	}
	
	public void updateBookImg(Long bookImgId, MultipartFile bookImgFile)throws Exception{
		if(!bookImgFile.isEmpty()) {
			BookImg savedBookImg = bookImgRepository.findById(bookImgId)
					.orElseThrow(EntityNotFoundException::new);
			
			if(!StringUtils.isEmpty(savedBookImg.getImgName())) {
				fileService.deleteFile(bookImgLocation+"/"+
						savedBookImg.getImgName());
			}
			String oriImgName = bookImgFile.getOriginalFilename();
			String imgName = fileService.uploadFile(bookImgLocation, oriImgName,
					bookImgFile.getBytes());
			String imgUrl = "/images/book/" + imgName;
			savedBookImg.updateBookImg(oriImgName, imgName, imgUrl);
		}
	}
}
