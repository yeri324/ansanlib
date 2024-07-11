package com.ansanlib.book.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.java.Log;

@Service
@Log
public class FileService {
	
	public String uploadFile(String uploadPath, String originalFileName, byte[] fileData) throws Exception{
		UUID uuid = UUID.randomUUID();
		String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
		String savedFileName = uuid.toString() + extension;
		String fileUploadFullUrl = uploadPath + "/" + savedFileName;
		FileOutputStream fos = new FileOutputStream(fileUploadFullUrl);
		fos.write(fileData);
		fos.close();
		return savedFileName;
	}
	
	//파일이미지 저장 (파일, 폴더이름, 게시글번호)
    public Map<String, String> fileHandler(MultipartFile file,String foldername,Long id) throws Exception {

        // 현재 작업경로의 절대경로
        // File.separator (/)
        String absolutePath = new File("").getAbsolutePath() + File.separator;

        // 파일 저장 위치
        String path = "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static"
                + File.separator + "images" + File.separator + foldername + File.separator + id.toString();
        File userImg = new File(path);

        if (!userImg.exists()) {
            // 폴더없으면 생성
            userImg.mkdirs();
        }

        if (!file.isEmpty()) {
            // 파일이 비어있지 않으면
            String contentType = file.getContentType();
            String originalFileExtension;

            // 타입에 따른 확장자 결정
            if (ObjectUtils.isEmpty(contentType)) {
                // 타입 없으면 null
                return null;
            } else {
                if (contentType.contains("image/jpeg")) {
                    originalFileExtension = ".jpg";
                } else if (contentType.contains("image/png")) {
                    originalFileExtension = ".png";
                } else {
                    return null;
                }
            }

            // 파일저장 이름
            String originalFileName = file.getOriginalFilename();
            // 확장자를 제외한 파일 이름과 확장자 추출
            int lastIndex = originalFileName.lastIndexOf('.');
            String fileName = originalFileName.substring(0, lastIndex);

            String userImgName = fileName + System.nanoTime() + originalFileExtension;

            // 파일 저장
            userImg = new File(absolutePath + path + File.separator + userImgName);
            file.transferTo(userImg);
            
            // 파일 경로 전달 (db 저장에 사용)
            String imgUrl = path + File.separator + userImgName;
            
            Map<String, String> map = new HashMap<>();
            map.put("imgName", userImgName);
            map.put("imgUrl", imgUrl);
            map.put("oriImgName", originalFileName);

            return map;

        }
        return null;
    }
    
    //해당 경로의 파일 바이트형으로 가져오기 (이미지경로)
    public byte[] getImgByte(String imgPath) throws IOException {
       
                Path imagePath = Paths.get(imgPath);
                System.out.println("imagePath: " + imagePath);

                if (Files.exists(imagePath)) {
                    // 파일이 존재하는 경우에만 읽어옴
                    return Files.readAllBytes(imagePath);
                } else {
                    System.out.println("파일이 존재하지 않습니다.");
                }
          
        // 만약 프로필 이미지를 찾을 수 없는 경우 빈 바이트 배열 반환
        return new byte[0];
    }
	
    //해당 경로의 파일 지우기 
	public void deleteFile(String filePath) throws Exception{
		File deleteFile = new File(filePath);
		if(deleteFile.exists()) {
			deleteFile.delete();
			System.out.println("파일을 삭제하였습니다.");
		}else {
			System.out.println("파일이 존재하지 않습니다.");
		}
	}
}