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

import com.tcdevelop.techshop.model.Product;
import com.tcdevelop.techshop.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {

	@Autowired
	ProductService service;

	@GetMapping
	public ResponseEntity<List<Product>> listProducts() {
		return ResponseEntity.ok(service.listProducts());
	}

	@PostMapping
	public ResponseEntity<@Valid Product> insertProduct(@RequestBody @Valid Product product) {
		return ResponseEntity.ok(service.upsertProduct(product));
	}

	@GetMapping("/{id}")
	public ResponseEntity<Product> insertProduct(@PathVariable String id) {

		Product product = service.getProductById(id);

		if (product == null) {
			ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(product);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody @Valid Product product) {
		Product newProduct = service.getProductById(id);

		if (newProduct == null) {
			ResponseEntity.notFound().build();
		}
		
		BeanUtils.copyProperties(product, newProduct, "id");
		
		return ResponseEntity.ok(service.upsertProduct(newProduct));
		
	}
	
	@DeleteMapping("/{id}")
	public void deleteProduct(@PathVariable String id) {
		Product product = service.getProductById(id);

		if (product == null) {
			ResponseEntity.notFound().build();
		}
		
		service.deleteProduct(product);
	}
}
