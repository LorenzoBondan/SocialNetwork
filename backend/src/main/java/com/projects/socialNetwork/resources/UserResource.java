package com.projects.socialNetwork.resources;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projects.socialNetwork.dto.PostDTO;
import com.projects.socialNetwork.dto.UserDTO;
import com.projects.socialNetwork.dto.UserInsertDTO;
import com.projects.socialNetwork.dto.UserUpdateDTO;
import com.projects.socialNetwork.services.UserService;

@RestController
@RequestMapping(value = "/users")
public class UserResource {

	@Autowired
	private UserService service;
	
	@GetMapping
	public ResponseEntity<Page<UserDTO>> findAll(@RequestParam(value = "name", defaultValue = "") String name, Pageable pageable) {
		Page<UserDTO> list = service.findAllPaged(name.trim(), pageable);	
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}") 
	public ResponseEntity<UserDTO> findById(@PathVariable Long id) {
		UserDTO dto = service.findById(id);	
		return ResponseEntity.ok().body(dto);
	}
	
	@GetMapping(value = "/{id}/following") 
	public ResponseEntity<List<UserDTO>> findByFollowers(@PathVariable Long id) {
		List<UserDTO> list = service.findByFollowers(id);	
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}/followers") 
	public ResponseEntity<List<UserDTO>> findByFollowing(@PathVariable Long id) {
		List<UserDTO> list = service.findByFollowing(id);	
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/email/{email}") 
	public ResponseEntity<UserDTO> findByEmail(@PathVariable String email) {
		UserDTO dto = service.findByEmail(email);	
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<UserDTO> insert (@Valid @RequestBody UserInsertDTO dto) {
		UserDTO newDto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(newDto.getId()).toUri();
		return ResponseEntity.created(uri).body(newDto);	
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<UserDTO> update(@PathVariable Long id, @Valid @RequestBody UserUpdateDTO dto)	{
		UserDTO newDto = service.update(id, dto);
		return ResponseEntity.ok().body(newDto);
	}
	
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<UserDTO> delete(@PathVariable Long id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	
	@PutMapping(value = "/startFollowing/{id}/{followerId}")
	public ResponseEntity<UserDTO> startFollowing(@PathVariable Long id, @PathVariable @Valid @RequestBody Long followerId)	{
		UserDTO newDto = service.startFollowing(id, followerId);
		return ResponseEntity.ok().body(newDto);
	}
	
	@PutMapping(value = "/stopFollowing/{id}/{followerId}")
	public ResponseEntity<UserDTO> stopFollowing(@PathVariable Long id, @PathVariable @Valid @RequestBody Long followerId)	{
		UserDTO newDto = service.stopFollowing(id, followerId);
		return ResponseEntity.ok().body(newDto);
	}
	
	@PutMapping(value = "/like/{id}/{postId}")
	public ResponseEntity<UserDTO> likePost(@PathVariable Long id, @PathVariable @Valid @RequestBody Long postId)	{
		UserDTO newDto = service.likePost(id, postId);
		return ResponseEntity.ok().body(newDto);
	}
	
	@PutMapping(value = "/dislike/{id}/{postId}")
	public ResponseEntity<UserDTO> dislikePost(@PathVariable Long id, @PathVariable @Valid @RequestBody Long postId)	{
		UserDTO newDto = service.dislikePost(id, postId);
		return ResponseEntity.ok().body(newDto);
	}
	
	@GetMapping(value = "/{id}/postsOfFollowing") 
	public ResponseEntity<List<PostDTO>> findPostsOfFollowing (@PathVariable Long id) {
		List<PostDTO> dto = service.findPostsOfFollowing(id);	
		return ResponseEntity.ok().body(dto);
	}
	
}
