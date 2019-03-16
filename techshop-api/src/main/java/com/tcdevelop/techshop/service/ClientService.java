package com.tcdevelop.techshop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcdevelop.techshop.model.Client;
import com.tcdevelop.techshop.repository.ClientRepository;

@Service
public class ClientService {

	@Autowired
	ClientRepository clientRepository;
	
	public List<Client> listClients(){
		return clientRepository.findAll();
	}
	
	public Client getClientById(String id) {
		return clientRepository.getOne(id);
	}
	
	public Client upsertClient(Client client) {
		return clientRepository.save(client);
	}
	
	public void deleteClient(Client client) {
		//clientRepository.delete(client);
		clientRepository.deleteById(client.getId());
	}
	

}
