package com.ars.ecomm_api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "product_resources")
public class ProductResource {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "product_resource_id",unique = true, nullable = false)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false)
    private Boolean isPrimary;

    @Column(nullable = false)
    private String type;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
