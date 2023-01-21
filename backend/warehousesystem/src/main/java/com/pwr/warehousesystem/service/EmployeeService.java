package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.Employee;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.exception.OperationFailedException;
import com.pwr.warehousesystem.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    public Employee findByEmployeeId(long employeeId){
        return employeeRepository.findById(employeeId).orElseThrow(ElementNotFoundException::new);
    }

    public Employee saveEmployee(Employee employee){
        if ((employee.getId() != null && employeeRepository.existsById(employee.getId()))
        ) {
            throw new OperationFailedException();
        }
        return employeeRepository.save(employee);
    }

    public void deleteEmployee(long employeeId){
        if(!employeeRepository.existsById(employeeId)){
            throw new OperationFailedException();
        }
        employeeRepository.deleteById(employeeId);
    }
}
