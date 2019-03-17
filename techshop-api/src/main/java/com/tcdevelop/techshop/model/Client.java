package com.tcdevelop.techshop.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table( uniqueConstraints = { @UniqueConstraint( columnNames = { "name" } ) } )
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Client {
	
	@Id @GeneratedValue(generator="system-uuid")
	@GenericGenerator(name="system-uuid",
	  strategy = "uuid")
	private String id;
	
	@NotBlank(message = "The name of the client cannot be null or empty")
	private String name;
	
	@JsonIgnoreProperties("client")
	//@NotNull(message = "The address of the client cannot be null or empty")
	@JoinColumn(name = "address_id")
	@OneToOne
	private Address address;
	
	@Positive(message = "The credit of the client cannot be null or empty")
	private double credit;
	
	@Transient
	@JsonIgnoreProperties("client")
	@OneToMany(mappedBy = "client", orphanRemoval = true)
	private List<Sale> sales;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public double getCredit() {
		return credit;
	}

	public void setCredit(double credit) {
		this.credit = credit;
	}

	public List<Sale> getSales() {
		return sales;
	}

	public void setSales(List<Sale> sales) {
		this.sales = sales;
	}
	
	
	

}
