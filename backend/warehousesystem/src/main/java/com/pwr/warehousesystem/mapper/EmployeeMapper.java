package com.pwr.warehousesystem.mapper;

import com.pwr.warehousesystem.dto.EmployeeDTO;
import com.pwr.warehousesystem.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EmployeeMapper extends ApplicationMapper<Employee, EmployeeDTO> {

    private final WarehouseMapper warehouseMapper;

    @Autowired
    public EmployeeMapper(WarehouseMapper warehouseMapper) {
        this.warehouseMapper = warehouseMapper;
    }

    @Override
    public Employee toEntity(EmployeeDTO employeeDTO) {
        Employee employee = new Employee();
        employee.setId(employeeDTO.getId());
        employee.setEmployeeId(employeeDTO.getEmployeeId());
        employee.setName(employeeDTO.getName());
        employee.setSurname(employeeDTO.getSurname());
        employee.setFunction(employeeDTO.getFunction());
        employee.setWarehouse(warehouseMapper.toEntity(employeeDTO.getWarehouse()));
        return employee;
    }

    @Override
    public EmployeeDTO toDto(Employee employee) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setId(employee.getId());
        employeeDTO.setEmployeeId(employee.getEmployeeId());
        employeeDTO.setName(employee.getName());
        employeeDTO.setSurname(employee.getSurname());
        employeeDTO.setFunction(employee.getFunction());
        employeeDTO.setWarehouse(warehouseMapper.toDto(employee.getWarehouse()));
        return employeeDTO;
    }
}
