package com.ars.ecomm_api.auth.controller;

import com.ars.ecomm_api.auth.entity.AppUser;
import com.ars.ecomm_api.auth.dto.request.LoginRequest;
import com.ars.ecomm_api.auth.dto.request.RegistrationRequest;
import com.ars.ecomm_api.auth.dto.response.RegistrationResponse;
import com.ars.ecomm_api.auth.helper.JwtTokenHelper;
import com.ars.ecomm_api.auth.service.RegistrationService;
import com.ars.ecomm_api.auth.token.UserToken;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authManager;
    private final RegistrationService registrationService;
    private final UserDetailsService userDetailsService;
    private final JwtTokenHelper jwtTokenHelper;


    @PostMapping("/login")
    public ResponseEntity<UserToken> login(@RequestBody LoginRequest request) {
        try {
            Authentication auth = UsernamePasswordAuthenticationToken.unauthenticated(request.getUsername(), request.getPassword());
            Authentication authResponse = authManager.authenticate(auth);
            if(authResponse.isAuthenticated()) {
                AppUser user = (AppUser) authResponse.getPrincipal();
                if(!user.isEnabled()){
                    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }
                String token = jwtTokenHelper.generateToken(user.getEmail());
                UserToken userToken = UserToken.builder().token(token).build();
                return new ResponseEntity<>(userToken,HttpStatus.OK);
            }
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(@RequestBody RegistrationRequest request) {
        RegistrationResponse registrationResponse = registrationService.createUser(request);
       return new ResponseEntity<>(registrationResponse, HttpStatusCode.valueOf(registrationResponse.getCode()));

    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody Map<String,String> map){
        String username = map.get("username");
        String code = map.get("code");
        AppUser user = (AppUser) userDetailsService.loadUserByUsername(username);
        if(null != user && user.getVerificationCode().equals(code)){
            registrationService.verifyUser(username);
            return new ResponseEntity<>(HttpStatus.OK);
        }return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
