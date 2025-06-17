package com.ars.ecomm_api.auth.entity;

import com.ars.ecomm_api.entity.Address;
import com.ars.ecomm_api.entity.Order;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "users")
public class AppUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    private UUID id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @JsonIgnore
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String provider;


    private String phoneNumber;

    private String verificationCode;
    private Boolean enabled = false;

    @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_auth_junction",
            joinColumns = @JoinColumn(referencedColumnName = "user_id"),
            inverseJoinColumns = @JoinColumn(referencedColumnName = "authority_id")
    )
    private List<Authority> authorities = new ArrayList<>();


    @OneToMany(mappedBy ="user",cascade = CascadeType.ALL)
    @JsonManagedReference
    @ToString.Exclude
    private List<Address> addressList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Order> orders = new ArrayList<>();

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;






    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getUsername() {
        return email;
    }



    @PrePersist
    protected void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    protected void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

}
