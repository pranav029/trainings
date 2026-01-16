package com.assignment.cgi.service;

import com.assignment.cgi.dto.ResponseDto;
import com.assignment.cgi.entities.Customer;
import org.apache.coyote.Response;

import java.util.List;

public interface CustomerService {
    ResponseDto<Customer> addCustomer(Customer customer);

    ResponseDto<List<Customer>> getAllCustomers();

    ResponseDto<Void> deleteCustomer(Integer customerId);

    ResponseDto<Customer> getCustomer(Integer customerId);
}
