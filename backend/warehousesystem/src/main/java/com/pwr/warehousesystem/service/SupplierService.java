package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.Supplier;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.exception.OperationFailedException;
import com.pwr.warehousesystem.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {

    private final SupplierRepository supplierRepository;

    @Autowired
    public SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    public List<Supplier> getSuppliers(){
        return supplierRepository.findAll();
    }

    public Supplier getBySupplierId(String supplierId){
        return supplierRepository.findBySupplierId(supplierId).orElseThrow(ElementNotFoundException::new);
    }

    public Supplier saveSupplier(Supplier supplier){
        if ((supplier.getId() != null && supplierRepository.existsById(supplier.getId()))
                || supplierRepository.existsBySupplierId(supplier.getSupplierId())
        ) {
            throw new OperationFailedException();
        }
        return supplierRepository.save(supplier);
    }

    public void deleteSupplier(String supplierId){
        if(!supplierRepository.existsBySupplierId(supplierId)){
            throw new OperationFailedException();
        }
         supplierRepository.deleteBySupplierId(supplierId);
    }
}
