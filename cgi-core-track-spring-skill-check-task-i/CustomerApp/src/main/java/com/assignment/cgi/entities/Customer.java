package com.assignment.cgi.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer customerId;
    @NotBlank(message = "Customer name cannot be blank")
    private String customerName;
    @NotBlank(message = "Phone number cannot be blank")
    @Size(min = 10, max = 10, message = "Phone should consists of 10 digits")
    private String customerMobile;
    @NotBlank(message = "Customer address cannot be blank")
    private String customerAddress;
}
