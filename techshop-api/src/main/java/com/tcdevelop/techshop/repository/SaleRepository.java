package com.tcdevelop.techshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tcdevelop.techshop.model.Sale;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {

	Sale findById(String uuid);
}
