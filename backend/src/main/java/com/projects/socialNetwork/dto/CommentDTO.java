package com.projects.socialNetwork.dto;

import java.io.Serializable;
import java.util.Objects;

import com.projects.socialNetwork.entities.Comment;
import com.projects.socialNetwork.entities.Post;
import com.projects.socialNetwork.entities.User;

public class CommentDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String description;
	private User user;
	private Post post;
	
	public CommentDTO() {}

	public CommentDTO(Long id, String description, User user, Post post) {
		super();
		this.id = id;
		this.description = description;
		this.user = user;
		this.post = post;
	}
	
	public CommentDTO(Comment entity) {
		this.id = entity.getId();
		this.description = entity.getDescription();
		this.user = entity.getUser();
		this.post = entity.getPost();
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
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
