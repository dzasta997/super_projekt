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

    public Supplier getBySupplierId(long supplierId){
        return supplierRepository.findById(supplierId).orElseThrow(ElementNotFoundException::new);
    }

    public Supplier saveSupplier(Supplier supplier){
        if ((supplier.getId() != null && supplierRepository.existsById(supplier.getId()))
        ) {
            throw new OperationFailedException();
        }
        return supplierRepository.save(supplier);
    }

    public void deleteSupplier(long supplierId){
        if(!supplierRepository.existsById(supplierId)){
            throw new OperationFailedException();
        }
         supplierRepository.deleteById(supplierId);
    }
}
