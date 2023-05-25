package com.projects.socialNetwork.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.socialNetwork.dto.CommentDTO;
import com.projects.socialNetwork.dto.LikeDTO;
import com.projects.socialNetwork.dto.PostDTO;
import com.projects.socialNetwork.entities.Comment;
import com.projects.socialNetwork.entities.Like;
import com.projects.socialNetwork.entities.Post;
import com.projects.socialNetwork.repositories.CommentRepository;
import com.projects.socialNetwork.repositories.LikeRepository;
import com.projects.socialNetwork.repositories.PostRepository;
import com.projects.socialNetwork.repositories.UserRepository;
import com.projects.socialNetwork.services.exceptions.DataBaseException;
import com.projects.socialNetwork.services.exceptions.ResourceNotFoundException;

@Service
public class PostService {

	@Autowired
	private PostRepository repository;
	
	@Autowired
	private CommentRepository commentRepository;
	
	@Autowired
	private LikeRepository likeRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Transactional(readOnly = true)
	public Page<PostDTO> findAllPaged(Pageable pageable) {
		Page<Post> list = repository.findAll(pageable);
		return list.map(x -> new PostDTO(x));
	}

	@Transactional(readOnly = true)
	public PostDTO findById(Long id) {
		Optional<Post> obj = repository.findById(id);
		Post entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new PostDTO(entity);
	}

	@Transactional
	public PostDTO insert(PostDTO dto) {
		Post entity = new Post();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new PostDTO(entity);
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

	private void copyDtoToEntity(PostDTO dto, Post entity) {
		entity.setTitle(dto.getTitle());
		entity.setDescription(dto.getDescription());
		entity.setDate(dto.getDate());
		entity.setUser(userRepository.getOne(dto.getUser().getId()));
		
		entity.getComments().clear();

		for (CommentDTO comDto : dto.getComments()) {
			Comment comment = commentRepository.getOne(comDto.getId());
			entity.getComments().add(comment);
		}
		
		entity.getLikes().clear();

		for (LikeDTO likeDto : dto.getLikes()) {
			Like like = likeRepository.getOne(likeDto.getId());
			entity.getLikes().add(like);
		}
	}


}
