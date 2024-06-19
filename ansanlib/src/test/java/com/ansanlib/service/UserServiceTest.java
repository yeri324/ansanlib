package com.ansanlib.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.dto.user.UserFormDto;
import com.ansanlib.entity.LibUser;
import com.ansanlib.service.user.UserService;

@SpringBootTest
@Transactional
@TestPropertySource(locations="classpath:application-test.properties")
class UserServiceTest {

    @Autowired
   UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;
    
    public LibUser createUser(){     // 회원정보를 입력한 Member 엔티티를 만드는 메소드
    	UserFormDto userFormDto = new UserFormDto();
        userFormDto.setEmail("test@email.com");
        userFormDto.setName("홍길동");
        userFormDto.setAddress("서울시 마포구 합정동");
        userFormDto.setPassword("1234");
        return LibUser.createUser(userFormDto, passwordEncoder);
    }

//    @Test
//    @DisplayName("회원가입 테스트")
//    public void saveMemberTest(){
//        Member member = createMember();
//        Member savedMember = memberService.saveMember(member);
//        assertEquals(member.getEmail(), savedMember.getEmail());
//        assertEquals(member.getName(), savedMember.getName());
//        assertEquals(member.getAddress(), savedMember.getAddress());
//        assertEquals(member.getPassword(), savedMember.getPassword());
//        assertEquals(member.getRole(), savedMember.getRole());
//    }
    
    @Test
    @DisplayName("중복 회원 가입 테스트")
    public void saveDuplicateMemberTest(){
        LibUser user1 = createUser();
        LibUser user2 = createUser();
        userService.saveUser(user1);
        Throwable e = assertThrows(IllegalStateException.class, () -> {
            userService.saveUser(user2);});
        assertEquals("이미 가입된 회원입니다.", e.getMessage());
    }
}