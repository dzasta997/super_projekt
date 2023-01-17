package com.pwr.warehousesystem.entity;

import com.pwr.warehousesystem.exception.OperationFailedException;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Warehouse {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    @Column(unique = true, nullable = false)
    private String warehouseName;
    private String description;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;

    @PrePersist
    private void constraintCheck(){
        if(this.warehouseName == null)
            throw  new OperationFailedException();
    }

}
