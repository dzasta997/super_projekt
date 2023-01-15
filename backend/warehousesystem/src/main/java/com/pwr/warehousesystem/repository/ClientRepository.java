package com.pwr.warehousesystem.repository;

import com.pwr.warehousesystem.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    Optional<Client> findByName(String name);

    boolean existsByClientId(String clientId);
}