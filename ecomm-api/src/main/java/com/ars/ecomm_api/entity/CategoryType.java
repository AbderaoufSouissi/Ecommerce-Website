package com.ars.ecomm_api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "category_types")
public class CategoryType {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="category_type_id", unique = true, nullable = false)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", referencedColumnName = "category_id", nullable = false)
    @JsonBackReference
    private Category category;
}
