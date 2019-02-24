package com.tcdevelop.techshop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcdevelop.techshop.model.SaleItem;
import com.tcdevelop.techshop.repository.SaleItemRepository;

@Service
public class SaleItemService {

	@Autowired
	SaleItemRepository saleItemRepository;
	
	public List<SaleItem> listSaleItems(){
		return saleItemRepository.findAll();
	}
	
	public SaleItem getSaleItemById(String id) {
		return saleItemRepository.findById(id);
	}
	
	public SaleItem upsertSaleItem(SaleItem saleItem) {
		return saleItemRepository.save(saleItem);
	}
	
	public void deleteSaleItem(SaleItem saleItem) {
		saleItemRepository.delete(saleItem);
	}
	

}
