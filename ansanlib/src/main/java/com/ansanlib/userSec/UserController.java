package com.ansanlib.userSec;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.entity.LibUser;
import com.ansanlib.security.CustomUser;

import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    
    // 유저 정보 조회
    @Secured("ROLE_USER")           // USER 권한 설정
    @GetMapping("/info")
    public ResponseEntity<?> userInfo(@AuthenticationPrincipal CustomUser customUser) {

        LibUser user = customUser.getUser();
        
        // 인증된 사용자 정보 
        if( user != null )
            return new ResponseEntity<>(user, HttpStatus.OK);

        // 인증 되지 않음
        return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }


     // 회원가입
    @PostMapping("")
    public ResponseEntity<?> join(@RequestBody UserDto user) throws Exception {
    	
        return userService.join(user);

    }

 
}
