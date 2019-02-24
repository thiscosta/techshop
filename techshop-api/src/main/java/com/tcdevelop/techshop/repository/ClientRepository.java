package com.tcdevelop.techshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tcdevelop.techshop.model.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

	Client findById(String uuid);

}
