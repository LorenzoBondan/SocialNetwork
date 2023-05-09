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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projects.socialNetwork.dto.CommentDTO;
import com.projects.socialNetwork.dto.LikeDTO;
import com.projects.socialNetwork.dto.PostDTO;
import com.projects.socialNetwork.services.CommentService;
import com.projects.socialNetwork.services.LikeService;
import com.projects.socialNetwork.services.PostService;

@RestController
@RequestMapping(value = "/posts")
public class PostResource {

	@Autowired
	private PostService service;
	
	@Autowired
	private CommentService commentService;
	
	@Autowired
	private LikeService likeService;
	
	@GetMapping
	public ResponseEntity<Page<PostDTO>> findAll(Pageable pageable) {
		Page<PostDTO> list = service.findAllPaged(pageable);	
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}") 
	public ResponseEntity<PostDTO> findById(@PathVariable Long id) {
		PostDTO dto = service.findById(id);	
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<PostDTO> insert (@Valid @RequestBody PostDTO dto) {
		PostDTO newDto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(newDto.getId()).toUri();
		return ResponseEntity.created(uri).body(newDto);	
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<PostDTO> delete(@PathVariable Long id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping(path = "/{id}/comments")
	public ResponseEntity<List<CommentDTO>> findCommentsByPostId(@PathVariable Long id) {
		List<CommentDTO> commentsDTO = commentService.findCommentsByPostId(id);
		return ResponseEntity.ok(commentsDTO);
	}
	
	@GetMapping(path = "/{id}/likes")
	public ResponseEntity<List<LikeDTO>> findLikesByPostId(@PathVariable Long id) {
		List<LikeDTO> likesDTO = likeService.findLikesByPostId(id);
		return ResponseEntity.ok(likesDTO);
	}
	
}
