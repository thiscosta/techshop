package com.tcdevelop.techshop.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Sale {
	
	@Id @GeneratedValue(generator="system-uuid")
	@GenericGenerator(name="system-uuid",
	  strategy = "uuid")
	private String id;
	
	@NotNull(message = "The seller of the sale cannot be null or empty")
	@JoinColumn(name = "seller_id")
	@ManyToOne
	private User seller;
	
	@NotNull(message = "The client of the sale cannot be null or empty")
	@JoinColumn(name = "client_id")
	@ManyToOne
	private Client client;
	
	@Positive(message = "The shipping of the sale cannot be null or empty")
	private double shipping;

	private double price;
	
	@NotNull(message = "The date of the sale cannot be null or empty")
	private long date;
	
	@JsonIgnoreProperties("sale")
	@NotEmpty(message = "The item list of the sale cannot be null or empty")
	@OneToMany(mappedBy = "sale")
	private List<SaleItem> saleItems;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public User getSeller() {
		return seller;
	}

	public void setSeller(User seller) {
		this.seller = seller;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client cliente) {
		this.client = cliente;
	}

	public double getShipping() {
		return shipping;
	}

	public void setShipping(double shipping) {
		this.shipping = shipping;
	}

	public List<SaleItem> getSaleItems() {
		return saleItems;
	}

	public void setSaleItems(List<SaleItem> saleItems) {
		this.saleItems = saleItems;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public long getDate() {
		return date;
	}

	public void setDate(long date) {
		this.date = date;
	}

}
