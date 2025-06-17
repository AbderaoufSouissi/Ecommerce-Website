package com.ars.ecomm_api.repository;

import com.ars.ecomm_api.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface AddressRepository extends JpaRepository<Address, UUID> {
}
