package com.projects.socialNetwork.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.socialNetwork.dto.RoleDTO;
import com.projects.socialNetwork.dto.UserDTO;
import com.projects.socialNetwork.dto.UserInsertDTO;
import com.projects.socialNetwork.dto.UserUpdateDTO;
import com.projects.socialNetwork.entities.Comment;
import com.projects.socialNetwork.entities.Post;
import com.projects.socialNetwork.entities.Role;
import com.projects.socialNetwork.entities.User;
import com.projects.socialNetwork.repositories.CommentRepository;
import com.projects.socialNetwork.repositories.PostRepository;
import com.projects.socialNetwork.repositories.RoleRepository;
import com.projects.socialNetwork.repositories.UserRepository;
import com.projects.socialNetwork.services.exceptions.DataBaseException;
import com.projects.socialNetwork.services.exceptions.ResourceNotFoundException;

@Service
public class UserService implements UserDetailsService {

	private static Logger logger = org.slf4j.LoggerFactory.getLogger(UserService.class); 

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository repository;

	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private CommentRepository commentRepository;

	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(Pageable pageable) {
		Page<User> list = repository.findAll(pageable);
		return list.map(x -> new UserDTO(x));
	}

	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> obj = repository.findById(id);
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new UserDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public List<UserDTO> findByFollowers(Long id) { // find who this id is following
		Optional<User> obj = repository.findById(id);
		List<User> list = repository.findByFollowers(obj);
		return list.stream().map(item -> new UserDTO(item)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public List<UserDTO> findByFollowing(Long id) { // find who is followed by this user
		Optional<User> obj = repository.findById(id);
		List<User> list = repository.findByFollowing(obj);
		return list.stream().map(item -> new UserDTO(item)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public UserDTO findByEmail(String email) {
		Optional<User> obj = Optional.ofNullable(repository.findByEmail(email));
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO insert(UserInsertDTO dto) {
		User entity = new User();
		copyDtoToEntity(dto, entity);

		entity.setPassword(passwordEncoder.encode(dto.getPassword()));

		entity = repository.save(entity);
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO update(Long id, UserUpdateDTO dto) {
		try {
			User entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new UserDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
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

	private void copyDtoToEntity(UserDTO dto, User entity) {

		entity.setName(dto.getName());
		entity.setEmail(dto.getEmail());
		entity.setImgUrl(dto.getImgUrl());
		entity.setBio(dto.getBio());
		entity.setVerified(dto.getVerified());

		for (RoleDTO rolDto : dto.getRoles()) {
			Role role = roleRepository.getOne(rolDto.getId());
			entity.getRoles().add(role);
		}
		
		for (Long folDtoId : dto.getFollowersId()) {
			User follower = repository.getOne(folDtoId);
			entity.getFollowers().add(follower);
		}
		
		for (Long folDtoId : dto.getFollowingId()) {
			User following = repository.getOne(folDtoId);
			entity.getFollowing().add(following);
		}
		
		for (Long postDtoId : dto.getPostsId()) {
			Post post = postRepository.getOne(postDtoId);
			entity.getPosts().add(post);
		}
		
		for (Long commentDtoId : dto.getCommentsId()) {
			Comment comment = commentRepository.getOne(commentDtoId);
			entity.getComments().add(comment);
		}
		
		for (Long likeDtoId : dto.getPostsLikedId()) {
			Post post = postRepository.getOne(likeDtoId);
			entity.getPostsLiked().add(post);
		}
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = repository.findByEmail(username);

		if (user == null) {
			logger.error("User not found: " + username);
			throw new UsernameNotFoundException("Email not found");
		}
		logger.info("User found: " + username);
		return user;
	}
	
	
	@Transactional
	public UserDTO startFollowing(Long id, Long followerId) {
		try {
			User entity = repository.getOne(id);
			User follower = repository.getOne(followerId);
			
			entity.getFollowers().add(follower);
			
			entity = repository.save(entity);
			
			return new UserDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	
	@Transactional
	public UserDTO stopFollowing(Long id, Long followerId) {
		try {
			User entity = repository.getOne(id);
			User follower = repository.getOne(followerId);
			
			entity.getFollowers().remove(follower);
			
			entity = repository.save(entity);

			return new UserDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	
	@Transactional
	public UserDTO likePost(Long id, Long postId) {
		try {
			User entity = repository.getOne(id);
			Post post = postRepository.getOne(postId);
			
			entity.getPostsLiked().add(post);
			post.getLikes().add(entity);
			entity = repository.save(entity);
			post = postRepository.save(post);
			
			return new UserDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	
	@Transactional
	public UserDTO dislikePost(Long id, Long postId) {
		try {
			User entity = repository.getOne(id);
			Post post = postRepository.getOne(postId);
			
			entity.getPostsLiked().remove(post);
			post.getLikes().remove(entity);
			entity = repository.save(entity);
			post = postRepository.save(post);
			
			return new UserDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
}
