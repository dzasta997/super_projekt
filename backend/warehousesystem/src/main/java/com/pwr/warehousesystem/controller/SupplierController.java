package com.pwr.warehousesystem.controller;

import com.pwr.warehousesystem.dto.SupplierDTO;
import com.pwr.warehousesystem.entity.Supplier;
import com.pwr.warehousesystem.mapper.SupplierMapper;
import com.pwr.warehousesystem.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("suppliers")
public class SupplierController {

    private final SupplierService supplierService;
    private final SupplierMapper supplierMapper;

    @Autowired
    public SupplierController(SupplierService supplierService, SupplierMapper supplierMapper) {
        this.supplierService = supplierService;
        this.supplierMapper = supplierMapper;
    }

    @GetMapping
    public ResponseEntity<List<SupplierDTO>> getSuppliers() {
        List<Supplier> suppliers = supplierService.getSuppliers();
        return new ResponseEntity<>(supplierMapper.toDto(suppliers), HttpStatus.OK);
    }

    @GetMapping("/{supplierId}")
    public ResponseEntity<SupplierDTO> getBySupplierId(@PathVariable long supplierId) {
        Supplier supplier = supplierService.getBySupplierId(supplierId);
        return new ResponseEntity<>(supplierMapper.toDto(supplier), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<SupplierDTO> saveSupplier(@RequestBody SupplierDTO supplierDTO) {
        Supplier savedSupplier = supplierService.saveSupplier(supplierMapper.toEntity(supplierDTO));
        return new ResponseEntity<>(supplierMapper.toDto(savedSupplier), HttpStatus.OK);
    }


    @Transactional
    @DeleteMapping("/{supplierId}")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteSupplier(@PathVariable long supplierId) {
        supplierService.deleteSupplier(supplierId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/warehouse/{id}")
    public ResponseEntity<List<SupplierDTO>> getAllSuppliersByWarehouseId(@PathVariable long id) {
        List<Supplier> suppliers = supplierService.getAllByWarehouseId(id);
        return new ResponseEntity<>(supplierMapper.toDto(suppliers), HttpStatus.OK);
    }

}
