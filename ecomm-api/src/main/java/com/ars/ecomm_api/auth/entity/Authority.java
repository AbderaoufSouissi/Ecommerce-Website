package com.ars.ecomm_api.auth.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "authorities")
public class Authority implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "authority_id")
    private UUID id;

    @Column(nullable = false)
    private String roleCode;

    @Column(nullable = false)
    private String roleDescription;



    @Override
    public String getAuthority() {
        return roleCode;
    }
}
