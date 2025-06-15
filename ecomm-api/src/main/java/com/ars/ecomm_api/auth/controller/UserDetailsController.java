package com.ars.ecomm_api.auth.controller;

import com.ars.ecomm_api.auth.dto.UserDetailsDto;
import com.ars.ecomm_api.auth.entity.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserDetailsController {
    private final UserDetailsService userDetailsService;


    @GetMapping("/profile")
    public ResponseEntity<UserDetailsDto> getUserProfile(Principal principal) {
        AppUser user = (AppUser) userDetailsService.loadUserByUsername(principal.getName());
        if(null == user) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        }
        UserDetailsDto userDetailsDto = UserDetailsDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .authorityList(user.getAuthorities())
                .build();

        return new ResponseEntity<>(userDetailsDto, HttpStatus.OK);


    }
}
