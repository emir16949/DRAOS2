package com.eventpage.Controller;

import com.eventpage.Model.Comment;
import com.eventpage.Repository.UserRepository;
import com.eventpage.Security.TokenAuthenticationService;
import com.eventpage.Service.CommentService;
import org.hibernate.service.spi.ServiceException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comment")
@CrossOrigin(origins = "*")
public class CommentController {

  private CommentService commentService;
  private UserRepository userRepository;

  public CommentController(CommentService commentService, UserRepository userRepository) {
    this.commentService = commentService;
    this.userRepository = userRepository;
  }

  @GetMapping(value = "/all")
  public ResponseEntity getAll() throws ServiceException {
    return ResponseEntity.ok(commentService.getAll());
  }

  @GetMapping(value = "/{id}")
  public ResponseEntity getById(@PathVariable("id") String id) throws ServiceException {
    return ResponseEntity.ok(commentService.getByEventId(id));
  }

  @DeleteMapping(value = "/delete/all")
  @PreAuthorize("@tokenAuthenticationService.isAdmin()")
  public ResponseEntity deleteAll() throws ServiceException {
    return ResponseEntity.ok(commentService.deleteAll());
  }

  @DeleteMapping(value = "delete/{id}")
  @PreAuthorize("@tokenAuthenticationService.isAdmin()")
  public ResponseEntity deleteById(@PathVariable("id") String id) throws ServiceException {
    return ResponseEntity.ok(commentService.deleteById(id));
  }

  @PostMapping(value = "/create")
  public ResponseEntity postByComment(@RequestBody Comment comment) throws ServiceException {
    String usernameFromRequest = userRepository.findById(comment.getUser().getId()).get()
        .getUsername();
    String usernameFromToken = TokenAuthenticationService.getTokenUsername();
    if (!usernameFromRequest.equals(usernameFromToken) && !TokenAuthenticationService.isAdmin()) {
      throw new ServiceException("Not allowed to do changes");
    } else {
      return ResponseEntity.ok(commentService.postByComment(comment));
    }
  }

  @PutMapping
  public ResponseEntity putById(@RequestBody Comment comment) throws ServiceException {
    String usernameFromRequest = userRepository.findById(comment.getUser().getId()).get()
        .getUsername();
    String usernameFromToken = TokenAuthenticationService.getTokenUsername();
    if (!usernameFromRequest.equals(usernameFromToken) && !TokenAuthenticationService.isAdmin()) {
      throw new ServiceException("Not allowed to do changes");
    } else {
      return ResponseEntity.ok(commentService.putComment(comment));
    }
  }
}
