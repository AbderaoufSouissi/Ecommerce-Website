package com.ars.ecomm_api.auth.service;

import com.ars.ecomm_api.auth.entity.Authority;
import com.ars.ecomm_api.auth.repository.AuthorityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthorityService {

    private final AuthorityRepository authorityRepository;

    public List<Authority> getUserAuthorities() {
        List<Authority> authorities = new ArrayList<>();
        Authority authority = authorityRepository.findByRoleCode("USER");
        authorities.add(authority);
        return authorities;

    }

    public Authority createAuthority(String role, String description) {
        Authority authority = Authority.builder()
                .roleCode(role)
                .roleDescription(description)
                .build();
        return authorityRepository.save(authority);
    }

//    public List<Authority> getAdminAuthorities() {
//        List<Authority> authorities = new ArrayList<>();
//        Authority authority = authorityRepository.findByRoleCode("ADMIN");
//        authorities.add(authority);
//        return authorities;
//
//    }

}
