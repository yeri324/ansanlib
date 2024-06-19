package com.ansanlib.controller.admin.user;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ansanlib.dto.admin.user.AdminUserDto;
import com.ansanlib.entity.LibUser;
import com.ansanlib.service.admin.user.AdminUserService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping(value="/admin/user")
public class AdminUserController {
   
   private final AdminUserService adminUserService;
   
   @GetMapping("/search")
    public String searchUsers(@ModelAttribute AdminUserDto adminUserDto, Model model) {
        List<LibUser> users = adminUserService.ListUser(adminUserDto);
        model.addAttribute("users", users);
        return "admin/userForm";
    } 
   
    @GetMapping("/user/{id}")
       public String getUserDetails(@PathVariable Long id, Model model) {
           LibUser user = adminUserService.getUserById(id);
           model.addAttribute("user", user);
           return "admin/userDetail";
       }
    
   
}
