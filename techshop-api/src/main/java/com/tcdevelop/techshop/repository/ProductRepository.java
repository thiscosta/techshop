package com.tcdevelop.techshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tcdevelop.techshop.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	Product findById(String uuid);
	
}
