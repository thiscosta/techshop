package com.tcdevelop.techshop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcdevelop.techshop.model.Address;
import com.tcdevelop.techshop.repository.AddressRepository;

@Service
public class AddressService {

	@Autowired
	AddressRepository addressRepository;
	
	public List<Address> listAddresses(){
		return addressRepository.findAll();
	}
	
	public Address getAddressById(String id) {
		return addressRepository.findById(id);
	}
	
	public Address upsertAddress(Address address) {
		return addressRepository.save(address);
	}
	
	public void deleteAddress(Address address) {
		addressRepository.delete(address);
	}
	

}
