package com.ars.ecomm_api.service.impl;

import com.ars.ecomm_api.auth.entity.AppUser;
import com.ars.ecomm_api.dto.request.AddressRequest;
import com.ars.ecomm_api.entity.Address;
import com.ars.ecomm_api.repository.AddressRepository;
import com.ars.ecomm_api.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final UserDetailsService userDetailsService;
    private final AddressRepository addressRepository;

    @Override
    public Address createAddress(AddressRequest addressRequest, Principal principal) {
        AppUser user = (AppUser) userDetailsService.loadUserByUsername(principal.getName());
        Address address = Address.builder()
                .street(addressRequest.getStreet())
                .city(addressRequest.getCity())
                .zipCode(addressRequest.getZipCode())
                .state(addressRequest.getState())
                .PhoneNumber(addressRequest.getPhoneNumber())
                .user(user)
                .build();
        return addressRepository.save(address);
    }
}
