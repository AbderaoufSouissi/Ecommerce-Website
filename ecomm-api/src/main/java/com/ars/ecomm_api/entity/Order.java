package com.ars.ecomm_api.entity;

import com.ars.ecomm_api.auth.entity.AppUser;
import com.ars.ecomm_api.enumeration.OrderStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "order_id")
    private UUID id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date orderDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @ToString.Exclude
    @JsonBackReference
    private AppUser user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id",nullable = false)
    @JsonBackReference
    @ToString.Exclude
    private Address address;

    @Column(nullable = false)
    private Double totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus orderStatus;

    @Column(nullable = false)
    private String paymentMethod;

    @Column(nullable = true)
    private String shipmentNumber;

    @Column(nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date deliveryDate;

    @OneToMany(mappedBy="order", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    @ToString.Exclude
    private List<OrderItem> orderItems = new ArrayList<>();

    private Double discount;

    @OneToOne(mappedBy="order", cascade = CascadeType.ALL)
    @ToString.Exclude
    private Payment payment;

}
