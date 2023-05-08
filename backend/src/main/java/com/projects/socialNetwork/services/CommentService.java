package com.projects.socialNetwork.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.socialNetwork.dto.CommentDTO;
import com.projects.socialNetwork.entities.Comment;
import com.projects.socialNetwork.entities.Post;
import com.projects.socialNetwork.repositories.CommentRepository;
import com.projects.socialNetwork.repositories.PostRepository;
import com.projects.socialNetwork.services.exceptions.DataBaseException;
import com.projects.socialNetwork.services.exceptions.ResourceNotFoundException;

@Service
public class CommentService {

	@Autowired
	private CommentRepository repository;
	
	@Autowired
	private PostRepository postRepository;
	
	@Transactional(readOnly = true) // goes in PostResource
	public List<CommentDTO> findCommentsByPostId(Long PostId) {
		Post post = postRepository.getOne(PostId);
		return post.getComments().stream().map(comment -> new CommentDTO(comment)).collect(Collectors.toList());
	}

	@Transactional
	public CommentDTO insert(CommentDTO dto) {
		Comment entity = new Comment();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new CommentDTO(entity);
	}

	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}

		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integrity Violation");
		}
	}

	private void copyDtoToEntity(CommentDTO dto, Comment entity) {
		entity.setDescription(dto.getDescription());
		entity.setUser(dto.getUser());
	}

}
