package com.tcdevelop.techshop.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcdevelop.techshop.model.Sale;
import com.tcdevelop.techshop.service.SaleService;

@RestController
@RequestMapping("/sales")
public class SaleController {

	@Autowired
	SaleService service;

	@GetMapping
	public ResponseEntity<List<Sale>> listSales() {
		return ResponseEntity.ok(service.listSales());
	}

	@PostMapping
	public ResponseEntity<@Valid Sale> insertSale(@RequestBody @Valid Sale sale) {
		return ResponseEntity.ok(service.upsertSale(sale));
	}

	@GetMapping("/{id}")
	public ResponseEntity<Sale> insertSale(@PathVariable String id) {

		Sale sale = service.getSaleById(id);

		if (sale == null) {
			ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(sale);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Sale> updateSale(@PathVariable String id, @RequestBody @Valid Sale sale) {
		Sale newSale = service.getSaleById(id);

		if (newSale == null) {
			ResponseEntity.notFound().build();
		}
		
		BeanUtils.copyProperties(sale, newSale, "id");
		
		return ResponseEntity.ok(service.upsertSale(newSale));
		
	}
	
	@DeleteMapping("/{id}")
	public void deleteSale(@PathVariable String id) {
		Sale sale = service.getSaleById(id);

		if (sale == null) {
			ResponseEntity.notFound().build();
		}
		
		service.deleteSale(sale);
	}
}
