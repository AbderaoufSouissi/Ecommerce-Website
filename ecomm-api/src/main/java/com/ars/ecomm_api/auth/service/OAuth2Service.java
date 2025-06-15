package com.ars.ecomm_api.auth.service;

import com.ars.ecomm_api.auth.entity.AppUser;
import com.ars.ecomm_api.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuth2Service {

    private final UserRepository userRepository;
    private final AuthorityService authorityService;

    public AppUser getUser(String username) {
        return userRepository.findByEmail(username);
    }

    public AppUser createUser(OAuth2User oAuth2User, String provider) {
        String firstName = oAuth2User.getAttribute("given_name");
        String lastName = oAuth2User.getAttribute("family_name");
        String email = oAuth2User.getAttribute("email");

        AppUser appUser = AppUser
                .builder()
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .provider(provider)
                .enabled(true)
                .authorities(authorityService.getUserAuthorities())
                .build();
        return userRepository.save(appUser);
    }
}
