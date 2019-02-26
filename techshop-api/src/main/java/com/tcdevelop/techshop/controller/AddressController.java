package com.tcdevelop.techshop.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcdevelop.techshop.model.Address;
import com.tcdevelop.techshop.service.AddressService;

@RestController
@RequestMapping("/addresses")
public class AddressController {

	@Autowired
	AddressService service;

	@PreAuthorize("(hasRole('ROLE_SYSTEMADMINISTRATOR') or hasRole('ROLE_STANDARDUSER')) and #oauth2.hasScope('read')")
	@GetMapping
	public ResponseEntity<List<Address>> listAddresses() {
		return ResponseEntity.ok(service.listAddresses());
	}

	@PreAuthorize("(hasRole('ROLE_SYSTEMADMINISTRATOR') or hasRole('ROLE_STANDARDUSER')) and #oauth2.hasScope('write')")
	@PostMapping
	public ResponseEntity<@Valid Address> insertAddress(@RequestBody @Valid Address address) {
		return ResponseEntity.ok(service.upsertAddress(address));
	}

	@PreAuthorize("(hasRole('ROLE_SYSTEMADMINISTRATOR') or hasRole('ROLE_STANDARDUSER')) and #oauth2.hasScope('read')")
	@GetMapping("/{id}")
	public ResponseEntity<Address> insertAddress(@PathVariable String id) {

		Address address = service.getAddressById(id);

		if (address == null) {
			ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(address);
	}

	@PreAuthorize("(hasRole('ROLE_SYSTEMADMINISTRATOR') or hasRole('ROLE_STANDARDUSER')) and #oauth2.hasScope('write')")
	@PatchMapping("/{id}")
	public ResponseEntity<Address> updateAddress(@PathVariable String id, @RequestBody @Valid Address address) {
		Address newAddress = service.getAddressById(id);

		if (newAddress == null) {
			ResponseEntity.notFound().build();
		}
		
		BeanUtils.copyProperties(address, newAddress, "id");
		
		return ResponseEntity.ok(service.upsertAddress(newAddress));
		
	}
	
	@PreAuthorize("(hasRole('ROLE_SYSTEMADMINISTRATOR') or hasRole('ROLE_STANDARDUSER')) and #oauth2.hasScope('trust')")
	@DeleteMapping("/{id}")
	public void deleteAddress(@PathVariable String id) {
		Address address = service.getAddressById(id);

		if (address == null) {
			ResponseEntity.notFound().build();
		}
		
		service.deleteAddress(address);
	}
}
