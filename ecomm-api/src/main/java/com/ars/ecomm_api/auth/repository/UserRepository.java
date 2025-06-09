package com.ars.ecomm_api.auth.repository;

import com.ars.ecomm_api.auth.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<AppUser, UUID> {
    AppUser findByEmail(String username);
    boolean existsByEmail(String email);
}
