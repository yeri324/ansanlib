package com.ansanlib.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.constant.Gender;
import com.ansanlib.constant.Role;
import com.ansanlib.constant.UserStatus;
import com.ansanlib.entity.LibUser;
import com.ansanlib.user.repository.UserRepository;

@SpringBootTest
@Transactional  //(rollbackFor = {IllegalStateException.class})
//@TestPropertySource(locations = "classpath:application-test.properties")

public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testSaveLibUser() {
        LibUser libUser = new LibUser();
        libUser.setName("John Doe");
        libUser.setEmail("johndoe@example.com");
        libUser.setLoginid("john_doe");
        libUser.setPassword("password123");
        libUser.setPhone("1234567890");
        libUser.setAddress("123 Main St");
        libUser.setAddress2("Apt 4B");
        libUser.setGender(Gender.MALE);
        libUser.setRole(Role.USER);
        libUser.setSms("Enabled");
        libUser.setJoinDate(LocalDateTime.now());
        libUser.setLoginDate(LocalDateTime.now());
        libUser.setPenalty(0);
        libUser.setStatus(UserStatus.OFFPENALTY);
        libUser.setLateFee(0);

        LibUser savedLibUser = userRepository.save(libUser);

        assertThat(savedLibUser).isNotNull();
        assertThat(savedLibUser.getUser_id()).isNotNull(); // Assuming the id field is named user_id
        assertThat(savedLibUser.getName()).isEqualTo("John Doe");
        assertThat(savedLibUser.getEmail()).isEqualTo("johndoe@example.com");
        assertThat(savedLibUser.getLoginid()).isEqualTo("john_doe");
        assertThat(savedLibUser.getPassword()).isEqualTo("password123");
        assertThat(savedLibUser.getPhone()).isEqualTo("1234567890");
        assertThat(savedLibUser.getAddress()).isEqualTo("123 Main St");
        assertThat(savedLibUser.getAddress2()).isEqualTo("Apt 4B");
        assertThat(savedLibUser.getGender()).isEqualTo(Gender.MALE);
        assertThat(savedLibUser.getRole()).isEqualTo(Role.USER);
        assertThat(savedLibUser.getSms()).isEqualTo("Enabled");
        assertThat(savedLibUser.getJoinDate()).isNotNull();
        assertThat(savedLibUser.getLoginDate()).isNotNull();
        assertThat(savedLibUser.getPenalty()).isEqualTo(0);
        assertThat(savedLibUser.getStatus()).isEqualTo(UserStatus.OFFPENALTY);
        assertThat(savedLibUser.getLateFee()).isEqualTo(0);
    }
}
