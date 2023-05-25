package com.projects.socialNetwork.dto;

import java.io.Serializable;
import java.util.Objects;

import com.projects.socialNetwork.entities.Comment;

public class CommentDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String description;
	private UserDTO user;
	private Long postId;
	
	public CommentDTO() {}

	public CommentDTO(Long id, String description, UserDTO user, Long postId) {
		super();
		this.id = id;
		this.description = description;
		this.user = user;
		this.postId = postId;
	}
	
	public CommentDTO(Comment entity) {
		this.id = entity.getId();
		this.description = entity.getDescription();
		this.user = new UserDTO(entity.getUser());
		this.postId = entity.getPost().getId();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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
		CommentDTO other = (CommentDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	
	
	

}
