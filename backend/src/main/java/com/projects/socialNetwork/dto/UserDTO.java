package com.projects.socialNetwork.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.projects.socialNetwork.entities.Role;
import com.projects.socialNetwork.entities.User;

public class UserDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	
	@NotBlank(message = "Campo obrigatório")
	private String name;
	
	@Email(message = "Favor entrar com um email válido")
	private String email;

	private String imgUrl;
	
	private List<RoleDTO> roles = new ArrayList<>();
	
	private List<UserDTO> following = new ArrayList<>();
	
	private List<UserDTO> followers = new ArrayList<>();
	
	private List<PostDTO> posts = new ArrayList<>();
	  
	public UserDTO() {}

	
	public UserDTO(Long id, String name, String email, String password, Long favoriteTeamId, String imgUrl) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.imgUrl = imgUrl;
	}
	
	// construtor implantado na classe UserService
	public UserDTO(User entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.email = entity.getEmail();
		this.imgUrl = entity.getImgUrl();

		entity.getRoles().forEach(rol -> this.roles.add(new RoleDTO(rol)));
		entity.getFollowers().forEach(f -> this.followers.add(new UserDTO(f)));
		entity.getFollowing().forEach(f -> this.following.add(new UserDTO(f)));
		entity.getPosts().forEach(p -> this.posts.add(new PostDTO(p)));
	}

	public UserDTO(User entity, Set<Role> roles, Set<User> following, Set<User> followers) {
		this(entity); 
		roles.forEach(rol -> this.roles.add(new RoleDTO(rol))); 
		following.forEach(f -> this.following.add(new UserDTO(f)));
		followers.forEach(f -> this.followers.add(new UserDTO(f)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getImgUrl() {
		return imgUrl;
	}


	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	// SOMENTE O GET NAS LISTAS
	public List<RoleDTO> getRoles() { 
		return roles;
	}

	public List<UserDTO> getFollowing() {
		return following;
	}

	public List<UserDTO> getFollowers() {
		return followers;
	}
	

	public List<PostDTO> getPosts() {
		return posts;
	}


	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserDTO other = (UserDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	

}
