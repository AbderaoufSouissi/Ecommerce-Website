package com.ars.ecomm_api.auth.controller;

import com.ars.ecomm_api.auth.entity.AppUser;
import com.ars.ecomm_api.auth.helper.JwtTokenHelper;
import com.ars.ecomm_api.auth.service.OAuth2Service;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/oauth2")
@RequiredArgsConstructor
public class OAuth2Controller {
    private final OAuth2Service oAuth2Service;
    private final JwtTokenHelper jwtTokenHelper;



    @GetMapping("/success")
    public void callbackOauth2(@AuthenticationPrincipal OAuth2User oAuth2User, HttpServletResponse response) throws IOException {
        String username = oAuth2User.getAttribute("email");
        AppUser user = oAuth2Service.getUser(username);
        if(null == user) {
            user = oAuth2Service.createUser(oAuth2User,"google");
        }
        String token = jwtTokenHelper.generateToken(user.getUsername());
        response.sendRedirect("http://localhost:5173/oauth2/callback?token="+token);

    }
}
