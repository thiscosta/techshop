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

import com.tcdevelop.techshop.model.Client;
import com.tcdevelop.techshop.service.ClientService;

@RestController
@RequestMapping("/clients")
public class ClientController {

	@Autowired
	ClientService service;

	@GetMapping
	public ResponseEntity<List<Client>> listClientes() {
		return ResponseEntity.ok(service.listClients());
	}

	@PostMapping
	public ResponseEntity<@Valid Client> insertClient(@RequestBody @Valid Client client) {
		return ResponseEntity.ok(service.upsertClient(client));
	}

	@GetMapping("/{id}")
	public ResponseEntity<Client> insertClient(@PathVariable String id) {

		Client client = service.getClientById(id);

		if (client == null) {
			ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(client);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Client> updateClient(@PathVariable String id, @RequestBody @Valid Client client) {
		Client newClient = service.getClientById(id);

		if (newClient == null) {
			ResponseEntity.notFound().build();
		}
		
		BeanUtils.copyProperties(client, newClient, "id");
		
		return ResponseEntity.ok(service.upsertClient(newClient));
		
	}
	
	@DeleteMapping("/{id}")
	public void deleteClient(@PathVariable String id) {
		Client client = service.getClientById(id);

		if (client == null) {
			ResponseEntity.notFound().build();
		}
		
		service.deleteClient(client);
	}
}
