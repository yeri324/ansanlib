//package com.ansanlib.library;
//
//import java.util.HashMap;
//import java.util.Map;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.ansanlib.entity.Library;
//
//@Service
//public class LibraryService {
//
//    @Autowired
//    private LibraryRepository libraryRepository;
//
//    private static final Map<String, String> libraryMap = new HashMap<>();
//
//    static {
//        libraryMap.put("감골도서관", "7004");
//        libraryMap.put("반월도서관", "7008");
//        libraryMap.put("부곡도서관", "7011");
//        libraryMap.put("본오도서관", "7026");
//        libraryMap.put("성포도서관", "7003");
//        libraryMap.put("상록수도서관", "7006");
//        libraryMap.put("수암도서관", "7023");
//        libraryMap.put("관산도서관", "7002");
//        libraryMap.put("단원어린이도서관", "7005");
//        libraryMap.put("미디어도서관", "7014");
//        libraryMap.put("선부도서관", "7028");
//        libraryMap.put("원고잔도서관", "7018");
//    }
//
//    public String getLibraryNum(String libraryName) {
//        return libraryMap.getOrDefault(libraryName, "");
//    }
//
//    public Optional<Library> getLibraryByLibNum(String libNum) {
//        return libraryRepository.findByLibNum(libNum);
//    }
//}
