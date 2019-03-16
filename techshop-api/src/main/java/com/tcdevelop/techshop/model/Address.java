package com.tcdevelop.techshop.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Address {
	
	@Id @GeneratedValue(generator="system-uuid")
	@GenericGenerator(name="system-uuid",
	  strategy = "uuid")
	private String id;
	
	@NotBlank(message = "The country of the address cannot be null or empty")
	private String country;
	
	@NotBlank(message = "The state of the address cannot be null or empty")
	private String state;
	
	@NotBlank(message = "The city of the address cannot be null or empty")
	private String city;
	
	private String neighborhood;
	
	@NotBlank(message = "The street of the address cannot be null or empty")
	private String street;
	
	@NotBlank(message = "The number of the address cannot be null or empty")
	private String number;
	
	@NotBlank(message = "The zip code of the address cannot be null or empty")
	@Column(name = "zip_code")
	private String zipCode;
	
	@JsonIgnoreProperties("address")
	@OneToOne(mappedBy = "address", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, optional = false, orphanRemoval = true)
	private Client client;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getNeighborhood() {
		return neighborhood;
	}

	public void setNeighborhood(String neighborhood) {
		this.neighborhood = neighborhood;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

}
