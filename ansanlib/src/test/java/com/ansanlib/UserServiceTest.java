package com.ansanlib;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ansanlib.constant.Gender;
import com.ansanlib.constant.Role;
import com.ansanlib.entity.LibUser;
import com.ansanlib.entity.Library;
import com.ansanlib.library.LibraryRepository;
import com.ansanlib.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@SpringBootTest
@RequiredArgsConstructor
public class UserServiceTest {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final LibraryRepository libraryRepository;
    @Test
    public void testSaveUser() {
    	 LibUser user = new LibUser();
	        user.setLoginid("admin");
	        user.setPassword(passwordEncoder.encode("1234"));
	        user.setName("관리자");
	        user.setAddress("대전 서구 둔산서로 17");
	        user.setAddress2("6층 중앙능력개발원");
	        user.setEmail("test@example.com");
	        user.setPhone("000-0000-0000");
	        user.setGender(Gender.MALE);
	        user.setRole(Role.ROLE_ADMIN);
	        user.setJoinDate(LocalDateTime.now());
	        user.setLoginDate(LocalDateTime.now());
	        user.setSms("yes");
	        

	        userRepository.save(user);

			libraryRepository.save(new Library(null, "7004", "감골도서관", null, null, null));
			libraryRepository.save(new Library(null, "7008", "반월도서관", null, null, null));
			libraryRepository.save(new Library(null, "7011", "부곡도서관", null, null, null));
			libraryRepository.save(new Library(null, "7026", "본오도서관", null, null, null));
			libraryRepository.save(new Library(null, "7006", "상록수도서관", null, null, null));
			libraryRepository.save(new Library(null, "7007", "상록어린이도서관", null, null, null));
			libraryRepository.save(new Library(null, "7003", "성포도서관", null, null, null));
			libraryRepository.save(new Library(null, "7023", "수암도서관", null, null, null));
			libraryRepository.save(new Library(null, "7002", "관산도서관", null, null, null));
			libraryRepository.save(new Library(null, "7005", "단원도서관", null, null, null));
			libraryRepository.save(new Library(null, "7014", "미디어도서관", null, null, null));
			libraryRepository.save(new Library(null, "7028", "선부도서관", null, null, null));
			libraryRepository.save(new Library(null, "7018", "원고잔도서관", null, null, null));
    }
}
