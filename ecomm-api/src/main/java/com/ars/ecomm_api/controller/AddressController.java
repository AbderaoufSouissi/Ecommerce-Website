package com.ars.ecomm_api.controller;

import com.ars.ecomm_api.dto.request.AddressRequest;
import com.ars.ecomm_api.entity.Address;
import com.ars.ecomm_api.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @PostMapping
    public ResponseEntity<Address> createAddress(@RequestBody AddressRequest addressRequest, Principal principal) {
        return new ResponseEntity<>(addressService.createAddress(addressRequest,principal), HttpStatus.CREATED);


    }
}
