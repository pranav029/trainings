package com.assignment.cgi.service;

import com.assignment.cgi.dto.ResponseDto;
import com.assignment.cgi.entities.Customer;
import com.assignment.cgi.exceptions.CustomerAlreadyExitsException;
import com.assignment.cgi.exceptions.ResourceNotFoundException;
import com.assignment.cgi.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public ResponseDto<Customer> addCustomer(Customer customer) {
        if (customer.getCustomerId() != null) {
            boolean customerAlreadyExits = customerRepository.findById(customer.getCustomerId()).isPresent();
            if (customerAlreadyExits)
                throw new CustomerAlreadyExitsException(customer.getCustomerId().toString());
        }
        Customer savedCustomer = customerRepository.save(customer);
        return new ResponseDto<>(true, String.format("Customer added successfully with id %s", savedCustomer.getCustomerId()), savedCustomer, null);
    }

    @Override
    public ResponseDto<List<Customer>> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        if (customers.isEmpty()) return new ResponseDto<>(true, "There are no customers in the database", null, null);
        return new ResponseDto<>(true, null, customers, null);
    }

    @Override
    public ResponseDto<Void> deleteCustomer(Integer customerId) {
        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer", "customerId", customerId.toString()));
        customerRepository.delete(customer);
        return new ResponseDto<>(true, String.format("Customer with id %s deleted successfully", customerId), null, null);
    }

    @Override
    public ResponseDto<Customer> getCustomer(Integer customerId) {
        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer", "customerId", customerId.toString()));
        return new ResponseDto<>(true, null, customer, null);
    }
}
