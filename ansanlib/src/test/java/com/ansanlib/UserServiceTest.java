//package com.ansanlib;
//
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//
//import java.time.LocalDateTime;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import com.ansanlib.constant.Role;
//import com.ansanlib.entity.LibUser;
//import com.ansanlib.user.repository.UserRepository;
//
//@SpringBootTest
//public class UserServiceTest {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Test
//    public void testSaveUser() {
//        LibUser user = new LibUser();
//        user.setLoginid("test");
//        user.setPassword("1234");
//        user.setName("테스트");
//        user.setAddress("123 Main St");
//        user.setAddress2("Apt 4B");
//        user.setEmail("tes@example.com");
//        user.setPhone("555-555-5555");
//        user.setRole(Role.ROLE_USER);
//        user.setJoinDate(LocalDateTime.now());
//        user.setLoginDate(LocalDateTime.now());
//        user.setSms("동의");
//
//        userRepository.save(user);
//        
//        assertNotNull(user.getLoginid()); // Ensure ID is generated
//    }
//}
