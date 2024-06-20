//package com.ansanlib.controller.user;
//
//
//import java.util.Map;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.ansanlib.constant.Role;
//import com.ansanlib.dto.user.UserDto;
//import com.ansanlib.entity.LibUser;
//import com.ansanlib.service.user.UserService;
//
//import lombok.RequiredArgsConstructor;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/api")
//public class UserController {
//
//    private final UserService userService;
//    private final PasswordEncoder passwordEncoder;
//
//    @PostMapping("/user/signup")
//    public ResponseEntity<String> signUp(@RequestBody UserDto userDto) {
//        // System.out.println("signup");
//        return userService.signUp(userDto, passwordEncoder);
//    }
//
//    @PostMapping("user/compSignup")
//    public ResponseEntity<String> compSignup(@RequestBody UserDto memberDto) {
//        // System.out.println("signup");
//        return userService.compSignup(userDto, passwordEncoder);
//    }
//
//    @GetMapping("/user/checkId")
//    public ResponseEntity<String> checkId(@RequestParam("id") String id) {
//        return userService.checkId(id);
//    }
//
//    @GetMapping("/user/checkEmail")
//    public ResponseEntity<String> checkEmail(@RequestParam("email") String email) {
//        return userService.checkEmail(email);
//    }
//
//    @GetMapping("/user/email")
//    public ResponseEntity<String> isEmail(@RequestParam("email") String email,
//                                          @RequestParam("id") String loginid) {
//        return userService.currentEmail(email, loginid);
//    }
//
//
////    @GetMapping("/member/login")
////    public String loginForm() {
////        return "loginForm";
////    }
//
////    @PostMapping("/login")
////    public ResponseEntity<String> login(@RequestBody Map<String, String> loginData) {
////        // 요청 본문에서 아이디와 비밀번호 가져오기
////        String id = loginData.get("id");
////        String password = loginData.get("password");
////
////        return ResponseEntity.ok("로그인 성공");
////    }
//
////    @PostMapping("/login")
////    public ResponseEntity<Member> login(@RequestBody Map<String, String> request, HttpServletRequest httpRequest) {
////        String id = request.get("id");
////        String enteredPassword = request.get("password");
////
////        // 암호화된 패스워드
////        String storedPasswordHash = memberService.getPassword(id);
////
////        // 입력된 비밀번호, 암호화된 비밀번호 비교
////        boolean passwordMatches = passwordEncoder.matches(enteredPassword, storedPasswordHash);
////
////        if (passwordMatches) {
////            Member member = memberService.login(id, storedPasswordHash);
////
////            HttpSession session = httpRequest.getSession();
//////            if (session.getAttribute("id") != null) {
//////                System.out.println("id: " + session.getAttribute("id"));
//////            }
////            session.setAttribute("id", id);
////            session.setAttribute("state", member.getState());
////
////            return ResponseEntity.ok(member);
////        } else {
////            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
////        }
////    }
//
//
////    @GetMapping("/logout")
////    public ResponseEntity<String> logout(HttpServletRequest httpRequest) {
////        HttpSession session = httpRequest.getSession();
////        session.removeAttribute("id");
////        session.removeAttribute("state");
////        return ResponseEntity.ok("로그아웃 성공");
////    }
//
//  
//
//
//    @GetMapping("/create")
//    public ResponseEntity<String> admin() {
//        LibUser user = new LibUser();
//        user.setLoginid("admin");
//        user.setPassword(passwordEncoder.encode("1"));
//        user.setName("admin");
//        user.setAddress("admin's ");
//        user.setAddress2("home");
//        user.setEmail("admin@admin.com");
//        user.setPhone("010-0000-0000");
//        user.setRole(Role.ADMIN);
//      
//        userService.signUp(user);
//        return ResponseEntity.ok("admin create");
//    }
//
//
//    
//
//  
//    //아이디 찾기
//    @PostMapping("/user/findId")
//    public ResponseEntity<String> findId(@RequestBody Map<String, String> request) {
//        String email = request.get("email");
//     //   String phoneNum = request.get("phoneNum");
//        String foundId;
//
//        if (email != null) {
//            foundId = userService.findIdByEmail(email);
//     //   } else if (phoneNum != null) {
//          //  foundId = memberService.findIdByPhoneNum(phoneNum);
//        } else {
//            return ResponseEntity.badRequest().body("이메일이 필요합니다.");
//        }
//
//        if (foundId != null) {
//            return ResponseEntity.ok(foundId);
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("아이디를 찾을 수 없습니다.");
//        }
//    }
//
//
//
//}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
