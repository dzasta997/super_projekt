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

    public Employee findByEmployeeId(String employeeId){
        return employeeRepository.findByEmployeeId(employeeId).orElseThrow(ElementNotFoundException::new);
    }

    public Employee saveEmployee(Employee employee){
        if ((employee.getId() != null && employeeRepository.existsById(employee.getId()))
                || employeeRepository.existsByEmployeeId(employee.getEmployeeId())
        ) {
            throw new OperationFailedException();
        }
        return employeeRepository.save(employee);
    }

    public Long deleteEmployee(String employeeId){
        if(!employeeRepository.existsByEmployeeId(employeeId)){
            throw new OperationFailedException();
        }
        return  employeeRepository.deleteBYEmployeeId(employeeId);
    }
}
