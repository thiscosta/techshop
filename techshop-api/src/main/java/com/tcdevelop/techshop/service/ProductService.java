package com.tcdevelop.techshop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcdevelop.techshop.model.Product;
import com.tcdevelop.techshop.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	ProductRepository productRepository;
	
	public List<Product> listProducts(){
		return productRepository.findAll();
	}
	
	public Product getProductById(String id) {
		return productRepository.findById(id);
	}
	
	public Product upsertProduct(Product product) {
		return productRepository.save(product);
	}
	
	public void deleteProduct(Product product) {
		productRepository.delete(product);
	}
	

}
