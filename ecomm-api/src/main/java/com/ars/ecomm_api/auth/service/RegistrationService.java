package com.ars.ecomm_api.auth.service;

import com.ars.ecomm_api.auth.entity.AppUser;
import com.ars.ecomm_api.auth.helper.VerificationCodeGenerator;
import com.ars.ecomm_api.auth.repository.UserRepository;
import com.ars.ecomm_api.auth.dto.request.RegistrationRequest;
import com.ars.ecomm_api.auth.dto.response.RegistrationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerErrorException;

@Service
@RequiredArgsConstructor
public class RegistrationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthorityService authorityService;
    private final EmailService emailService;




    public RegistrationResponse createUser(RegistrationRequest request) {
        if(userRepository.existsByEmail(request.getEmail())){
            return RegistrationResponse.builder()
                    .code(400)
                    .message("A User with this Email already Exists")
                    .build();
        }
        try{

            AppUser user = new AppUser();
            user.setFirstName(request.getFirstName().toLowerCase());
            user.setLastName(request.getLastName().toLowerCase());
            user.setEmail(request.getEmail().toLowerCase());
            user.setPhoneNumber(request.getPhoneNumber());
            user.setEnabled(false);
            user.setProvider("manual");
            user.setPassword(passwordEncoder.encode(request.getPassword()));

            String code = VerificationCodeGenerator.generateCode();
            user.setVerificationCode(code);
            user.setAuthorities(authorityService.getUserAuthorities());
            userRepository.save(user);



            emailService.sendEmail(user);

            return RegistrationResponse.builder()
                    .code(201)
                    .message("Registration Successful")
                    .build();
        }
        catch (RuntimeException e) {
            throw new ServerErrorException(e.getMessage(),e.getCause());
        }
    }

    public void verifyUser(String username) {
        AppUser user = userRepository.findByEmail(username);
        user.setEnabled(true);
        userRepository.save(user);
    }
}
