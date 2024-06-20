//package com.ansanlib.repository.user;
//
//import java.util.Optional;
//
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.domain.Specification;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.lang.NonNull;
//
//import com.ansanlib.entity.LibUser;
//
//public interface UserRepository extends JpaRepository<LibUser, Long> {
//
//    // 기존 메소드들
//    Optional<LibUser> findByEmail(String email);
//    Optional<LibUser> findByPhoneNum(String phoneNum);
//
//    @NonNull
//    Optional<LibUser> findById(@NonNull String id);
//
//    Optional<LibUser> findByIdAndPassword(String id, String hashedPassword);
//
//    Optional<LibUser> findByIdAndNameAndEmail(String id, String name, String email);
//
//    Page<LibUser> findAll(Pageable pageable);
//
//    Page<LibUser> findByNameContaining(String searchString, Pageable pageable);
//    Page<LibUser> findByEmailContaining(String searchString, Pageable pageable);
//    Page<LibUser> findByAddressContaining(String searchString, Pageable pageable);
//    Page<LibUser> findByPhoneNumContaining(String searchString, Pageable pageable);
//    Page<LibUser> findByCompNameContaining(String searchString, Pageable pageable);
//    Page<LibUser> findByBusinessNumContaining(String searchString, Pageable pageable);
//    Page<LibUser> findByRepresentativeContaining(String searchString, Pageable pageable);
//    Page<LibUser> findByCompAddressContaining(String searchString, Pageable pageable);
//    Page<LibUser> findAll(Specification<LibUser> spec, Pageable pageable);
//
//
//    Optional<LibUser> findByIdAndName(String loginid, String name);
//}
