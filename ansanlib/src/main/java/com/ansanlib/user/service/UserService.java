package com.ansanlib.user.service;



import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.constant.Role;
import com.ansanlib.entity.LibUser;
import com.ansanlib.user.dto.UserDto;
import com.ansanlib.user.repository.UserRepository;

@Service
public class UserService    {

    private final UserRepository userRepository ;

  
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @Transactional
    public void join(LibUser user) {
        userRepository.save(user);
    }
    
    // 비밀번호 일치 확인 메서드
    public boolean isPasswordMatch(String password, String password2) {
        return password.equals(password2);
    
    }
    
    public List<LibUser> getList() {
        return userRepository.findAll();
    }

    public LibUser getuser(String loginid) {
        Optional<LibUser> user = userRepository.findByLoginid(loginid);
        return user.orElse(null);
    }
    public ResponseEntity<String> join(UserDto userDto) {
      //   비밀번호 일치 여부 확인
        if (!isPasswordMatch(userDto.getPassword(), userDto.getPassword2())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호가 일치하지 않습니다.");
        }

        LibUser user = new LibUser();
        user.bind(userDto);
        user.setRole(Role.USER);

        try {
            // 회원 정보를 데이터베이스에 저장
            userRepository.save(user);

            return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 중 오류가 발생했습니다.");
        }
    }

    
    public Page<LibUser> findUsersByEmail(String email, Pageable pageable) {
    	 return userRepository.findByEmailContaining(email, pageable);
    }
    
    
    public ResponseEntity<String> checkId(String loginid) {
        if (loginid.length() < 5) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("아이디는 5글자 이상만 가능합니다.");
        }

        if (!Pattern.matches("[a-zA-Z0-9]+", loginid)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("아이디는 영문과 숫자만 가능합니다.");
        }

        Optional<LibUser> user = userRepository.findByLoginid(loginid);
        if (user.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 아이디 입니다.");
        } else {
            return ResponseEntity.ok("사용 가능한 아이디 입니다.");
        }
    }
    
        //아이디 찾기
        public String findIdByEmail(String email) {
            Optional<LibUser> user = userRepository.findByEmail(email);
            return user.map(LibUser::getLoginid).orElse(null);
        }

      

    }

    
    
    
    
    
    
    
    
    
//    public LibUser registerUser(UserDto userDto) {
//        LibUser newUser = new LibUser();
//        newUser.setName(userDto.getName());
//        newUser.setEmail(userDto.getEmail());
//        newUser.setLoginid(userDto.getLoginid());
//        newUser.setPassword(userDto.getPassword());
//        newUser.setPhone(userDto.getPhone());
//        newUser.setAddress(userDto.getAddress());
//        newUser.setGender(userDto.getGender());
//        newUser.setSms(userDto.getSms());
//
//        // You can add additional fields as needed
//
//        return userRepository.save(newUser);
    

