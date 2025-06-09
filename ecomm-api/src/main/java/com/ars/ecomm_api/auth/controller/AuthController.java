package com.ars.ecomm_api.auth.controller;

import com.ars.ecomm_api.auth.entity.AppUser;
import com.ars.ecomm_api.auth.request.LoginRequest;
import com.ars.ecomm_api.auth.request.RegistrationRequest;
import com.ars.ecomm_api.auth.request.RegistrationResponse;
import com.ars.ecomm_api.auth.service.RegistrationService;
import com.ars.ecomm_api.auth.token.UserToken;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authManager;
    private final RegistrationService registrationService;


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
                //TODO GENERATE JWT TOKEN
                String token = null;
                UserToken userToken = UserToken.builder().token(token).build();
                return new ResponseEntity<>(HttpStatus.OK);
            }
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }




    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(@RequestBody RegistrationRequest request) {
        RegistrationResponse response = registrationService.createUser(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

}
