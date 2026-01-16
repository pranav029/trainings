package com.assignment.cgi.controller;

import com.assignment.cgi.dto.ResponseDto;
import com.assignment.cgi.entities.Customer;
import com.assignment.cgi.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping("/add")
    public ResponseEntity<ResponseDto<Customer>> addCustomer(@Validated @RequestBody Customer customer) {
        ResponseDto<Customer> responseDto = customerService.addCustomer(customer);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{customerId}")
    public ResponseEntity<ResponseDto<Void>> deleteCustomer(@PathVariable Integer customerId) {
        ResponseDto<Void> responseDto = customerService.deleteCustomer(customerId);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/get/{customerId}")
    public ResponseEntity<ResponseDto<Customer>> getCustomer(@PathVariable Integer customerId) {
        ResponseDto<Customer> responseDto = customerService.getCustomer(customerId);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseDto<List<Customer>>> getAllCustomer() {
        ResponseDto<List<Customer>> responseDto = customerService.getAllCustomers();
        return ResponseEntity.ok(responseDto);
    }
}
