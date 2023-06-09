package com.projects.socialNetwork.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.projects.socialNetwork.entities.Post;

public class PostDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String title;
	private String description;
	private Instant date;
	
	private UserDTO user;
	
	private List<CommentDTO> comments = new ArrayList<>();
	
	private List<UserDTO> likes = new ArrayList<>();
	
	public PostDTO() {}

	public PostDTO(Long id, String title, String description, Instant date, UserDTO user) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.date = date;
		this.user = user;
	}
	
	public PostDTO(Post entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.description = entity.getDescription();
		this.date = entity.getDate();
		this.user = new UserDTO(entity.getUser());
		
		entity.getComments().forEach(c -> this.comments.add(new CommentDTO(c)));
		entity.getLikes().forEach(l -> this.likes.add(new UserDTO(l)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Instant getDate() {
		return date;
	}

	public void setDate(Instant date) {
		this.date = date;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	public List<CommentDTO> getComments() {
		return comments;
	}

	public List<UserDTO> getLikes() {
		return likes;
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
		PostDTO other = (PostDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	

}
