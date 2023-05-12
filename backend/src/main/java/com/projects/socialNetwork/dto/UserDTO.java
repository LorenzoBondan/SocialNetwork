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
	
	private List<Long> followingId = new ArrayList<>();
	
	private List<Long> followersId = new ArrayList<>();
	
	private List<Long> postsId = new ArrayList<>();
	  
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
		entity.getFollowers().forEach(f -> this.followersId.add(f.getId()));
		entity.getFollowing().forEach(fo -> this.followingId.add(fo.getId()));
		entity.getPosts().forEach(p -> this.postsId.add(p.getId()));
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

	public List<Long> getFollowingId() {
		return followingId;
	}

	public List<Long> getFollowersId() {
		return followersId;
	}
	

	public List<Long> getPostsId() {
		return postsId;
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
