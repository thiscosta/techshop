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

import com.tcdevelop.techshop.model.SaleItem;
import com.tcdevelop.techshop.service.SaleItemService;

@RestController
@RequestMapping("/saleItems")
public class SaleItemController {

	@Autowired
	SaleItemService service;

	@GetMapping
	public ResponseEntity<List<SaleItem>> listSaleItems() {
		return ResponseEntity.ok(service.listSaleItems());
	}

	@PostMapping
	public ResponseEntity<@Valid SaleItem> insertSaleItem(@RequestBody @Valid SaleItem saleItem) {
		return ResponseEntity.ok(service.upsertSaleItem(saleItem));
	}

	@GetMapping("/{id}")
	public ResponseEntity<SaleItem> insertSaleItem(@PathVariable String id) {

		SaleItem saleItem = service.getSaleItemById(id);

		if (saleItem == null) {
			ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(saleItem);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<SaleItem> updateSaleItem(@PathVariable String id, @RequestBody @Valid SaleItem saleItem) {
		SaleItem newSaleItem = service.getSaleItemById(id);

		if (newSaleItem == null) {
			ResponseEntity.notFound().build();
		}
		
		BeanUtils.copyProperties(saleItem, newSaleItem, "id");
		
		return ResponseEntity.ok(service.upsertSaleItem(newSaleItem));
		
	}
	
	@DeleteMapping("/{id}")
	public void deleteSaleItem(@PathVariable String id) {
		SaleItem saleItem = service.getSaleItemById(id);

		if (saleItem == null) {
			ResponseEntity.notFound().build();
		}
		
		service.deleteSaleItem(saleItem);
	}
}
