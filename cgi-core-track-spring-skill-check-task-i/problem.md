# CGI Core Track Spring Module - Coding Challenge - I

## Objective

In this case study, we will create a simple sprint boot web application where you should be able to add customer,view all customers and also delete a particular customer by its id. The APIs should be tested through Postman

## Following are the steps:
	
- Define the model class Customer with the following Properties

			- customerId : int
			- customerName : String
			- customerMobile : String
			- customerAddress : String

- Configure the connection properties for MySql database in application.properties file 

- Define the CustomerRepository class
        
        -   Annotate the CustomerRepository with appropriate annotations


- Define CustomerService interface with methods for the following actions

        - add customer 
        - get all customers
        - delete customer by id

-  Define CustomerServiceImpl implementing all the methods of CustomerService

        - add customer
        - get all customers
        - delete customer by id

- Define the Customercontroller class and implement methods to create REST web service APIs based on 
        the methods defined in Customer Service interface

        HttpStatuses for 
            - add customer
                - code : 201 for successful addition
                - code : 409 if the user already exists
            - get all customers
                - code : 200 for successful
            - delete customer by id
                - code : 200 for successful deletion

- Add annotations wherever required

- Test the REST APIs using postman and share the screenshots of them
