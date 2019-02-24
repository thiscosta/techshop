package com.tcdevelop.techshop.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table( uniqueConstraints = { @UniqueConstraint( columnNames = { "username", "email", "phone" } ) } )
public class User {
	
	@Id @GeneratedValue(generator="system-uuid")
	@GenericGenerator(name="system-uuid",
	  strategy = "uuid")
	private String id;
	
	@NotBlank(message =  "The name of the user cannot be null or empty")
	private String name;
	
	@NotBlank(message =  "The username of the user cannot be null or empty")
	private String username;
	
	@NotBlank(message =  "The password of the user cannot be null or empty")
	private String password;
	
	@NotBlank(message =  "The email of the user cannot be null or empty")
	private String email;
	
	@NotBlank(message =  "The phone of the user cannot be null or empty")
	private String phone;
	
	@NotBlank(message =  "The role of the user cannot be null or empty")
	private String role;
	
	@NotNull(message =  "You must specify if the user is enabled or not")
	@Column(name = "is_enabled")
	private boolean isEnabled;
	
	@Column(name = "confirm_hash")
	private String confirmHash;
	
	@Column(name = "last_confirm_solicitation")
	private long lastConfirmSolicitation;

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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public boolean isEnabled() {
		return isEnabled;
	}

	public void setEnabled(boolean isEnabled) {
		this.isEnabled = isEnabled;
	}

	public String getConfirmHash() {
		return confirmHash;
	}

	public void setConfirmHash(String confirmHash) {
		this.confirmHash = confirmHash;
	}

	public long getLastConfirmSolicitation() {
		return lastConfirmSolicitation;
	}

	public void setLastConfirmSolicitation(long lastConfirmSolicitation) {
		this.lastConfirmSolicitation = lastConfirmSolicitation;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
