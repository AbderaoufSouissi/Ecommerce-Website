package com.ars.ecomm_api.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name ="category_id", unique = true, nullable = false)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private String description;

    @OneToMany(mappedBy = "category",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<CategoryType> categoryTypes = new ArrayList<>();;

}
