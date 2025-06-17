package com.ars.ecomm_api.service;

import com.ars.ecomm_api.dto.request.AddressRequest;
import com.ars.ecomm_api.entity.Address;
import java.security.Principal;

public interface AddressService {
    Address createAddress(AddressRequest addressRequest, Principal principal);
}
