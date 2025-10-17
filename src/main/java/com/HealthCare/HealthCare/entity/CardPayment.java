package com.HealthCare.HealthCare.entity;

import jakarta.persistence.*;

@Entity
public class CardPayment extends Payment {

    private String maskedCard;

    @Override
    public void makePayment() {
        this.setMethod("Card");
    }

    public void setMaskedFromCardNumber(String cardNumber) {
        if (cardNumber == null || cardNumber.length() < 4) {
            this.maskedCard = "****";
            return;
        }
        String last4 = cardNumber.substring(cardNumber.length() - 4);
        this.maskedCard = "**** **** **** " + last4;
    }

    public String getMaskedCard() {
        return maskedCard;
    }

    public void setMaskedCard(String maskedCard) {
        this.maskedCard = maskedCard;
    }
}


