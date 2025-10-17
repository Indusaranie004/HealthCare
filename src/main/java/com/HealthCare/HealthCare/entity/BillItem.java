package com.HealthCare.HealthCare.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class BillItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    private Integer quantity;
    private Float amount;

    @ManyToOne
    @JoinColumn(name = "bill_id")
    @JsonIgnore
    private Bill bill;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private HealthcareService healthcareService;

    // Methods
    public Float calculateTotal() {
        if (quantity != null && healthcareService != null && healthcareService.getPrice() != null) {
            return quantity * healthcareService.getPrice();
        }
        return 0.0f;
    }

    // Getters and Setters
    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }

    public HealthcareService getHealthcareService() {
        return healthcareService;
    }

    public void setHealthcareService(HealthcareService healthcareService) {
        this.healthcareService = healthcareService;
    }
}