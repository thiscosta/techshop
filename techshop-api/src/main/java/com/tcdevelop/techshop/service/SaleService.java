package com.tcdevelop.techshop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcdevelop.techshop.model.Sale;
import com.tcdevelop.techshop.model.SaleItem;
import com.tcdevelop.techshop.repository.SaleItemRepository;
import com.tcdevelop.techshop.repository.SaleRepository;

@Service
public class SaleService {

	@Autowired
	SaleRepository saleRepository;
	
	@Autowired
	SaleItemRepository saleItemRepository;

	public List<Sale> listSales() {
		return saleRepository.findAll();
	}

	public Sale getSaleById(String id) {
		return saleRepository.findById(id);
	}

	public Sale updateSale(Sale sale) {
		return saleRepository.save(sale);
	}

	public Sale upsertSale(Sale sale) {

		for (SaleItem item : sale.getSaleItems()) {
			item.setSale(sale);
			sale.setPrice(sale.getPrice() + (item.getProduct().getPrice() * item.getQuantity()));
		}
		sale.setPrice(sale.getPrice() + sale.getShipping());
		sale = saleRepository.save(sale);
		saleItemRepository.saveAll(sale.getSaleItems());

		return sale;
	}

	public void deleteSale(Sale sale) {
		saleRepository.delete(sale);
	}

}
