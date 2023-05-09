package com.projects.socialNetwork.dto;

import java.io.Serializable;
import java.util.Objects;

import com.projects.socialNetwork.entities.Like;
import com.projects.socialNetwork.entities.Post;
import com.projects.socialNetwork.entities.User;

public class LikeDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private User user;
	private Post postLike;
	
	public LikeDTO() {}
	
	public LikeDTO(Like entity) {
		this.id = entity.getId();
		this.user = entity.getUser();
		this.postLike = entity.getPost();
	}

	public LikeDTO(Long id, User user, Post post) {
		super();
		this.id = id;
		this.user = user;
		this.postLike = post;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Post getPost() {
		return postLike;
	}

	public void setPost(Post post) {
		this.postLike = post;
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
