package com.projects.socialNetwork.dto;

import java.io.Serializable;
import java.util.Objects;

import com.projects.socialNetwork.entities.Like;

public class LikeDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private UserDTO user;
	private Long postId;
	
	public LikeDTO() {}
	
	public LikeDTO(Like entity) {
		this.id = entity.getId();
		this.user = new UserDTO(entity.getUser());
		this.postId = entity.getPost().getId();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	public Long getPostId() {
		return postId;
	}

	public void setPost(Long postId) {
		this.postId = postId;
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
		LikeDTO other = (LikeDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	

}
