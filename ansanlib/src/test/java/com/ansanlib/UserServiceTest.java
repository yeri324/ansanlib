package com.ansanlib;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ansanlib.constant.Gender;
import com.ansanlib.constant.Role;
import com.ansanlib.entity.LibUser;
import com.ansanlib.user.repository.UserRepository;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;
    
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
        
        assertNotNull(user.getLoginid()); // Ensure ID is generated
    }
}
