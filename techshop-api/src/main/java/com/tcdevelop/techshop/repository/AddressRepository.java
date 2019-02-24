package com.tcdevelop.techshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tcdevelop.techshop.model.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long>  {

	Address findById(String uuid);
	
}
