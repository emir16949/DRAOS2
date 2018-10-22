package com.eventpage.Controller;

import com.eventpage.Model.Status;
import com.eventpage.Repository.UserRepository;
import com.eventpage.Security.TokenAuthenticationService;
import com.eventpage.Service.StatusService;
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
@RequestMapping("/status")
@CrossOrigin(origins = "*")
public class StatusController {

  private StatusService statusService;
  private UserRepository userRepository;

  public StatusController(StatusService statusService, UserRepository userRepository) {
    this.statusService = statusService;
    this.userRepository = userRepository;
  }

  @GetMapping(value = "/all")
  public ResponseEntity getAll() throws ServiceException {
    return ResponseEntity.ok(statusService.getAll());
  }

  @GetMapping(value = "/id/{id}")
  public ResponseEntity getById(@PathVariable("id") String id) throws ServiceException {
    return ResponseEntity.ok(statusService.getById(id));
  }

  @DeleteMapping(value = "/delete/all")
  @PreAuthorize("@tokenAuthenticationService.isAdmin()")
  public ResponseEntity deleteAll() throws ServiceException {
    return ResponseEntity.ok(statusService.deleteAll());
  }

  @DeleteMapping(value = "delete/{id}")
  @PreAuthorize("@tokenAuthenticationService.isAdmin()")
  public ResponseEntity deleteById(@PathVariable("id") String id) throws ServiceException {
    return ResponseEntity.ok(statusService.deleteById(id));
  }

  @PostMapping(value = "/create")
  public ResponseEntity postByStatus(@RequestBody Status status) throws ServiceException {
    String usernameFromRequest = userRepository.findById(status.getUser().getId()).get()
        .getUsername();
    String usernameFromToken = TokenAuthenticationService.getTokenUsername();
    if (!usernameFromRequest.equals(usernameFromToken) && !TokenAuthenticationService.isAdmin()) {
      throw new ServiceException("Not allowed to do changes");
    } else {
      return ResponseEntity.ok(statusService.createStatus(status));
    }
  }

  @PutMapping
  public ResponseEntity putById(@RequestBody Status status) throws ServiceException {
    String usernameFromRequest = userRepository.findById(status.getUser().getId()).get()
        .getUsername();
    String usernameFromToken = TokenAuthenticationService.getTokenUsername();
    if (!usernameFromRequest.equals(usernameFromToken) && !TokenAuthenticationService.isAdmin()) {
      throw new ServiceException("Not allowed to do changes");
    } else {
      return ResponseEntity.ok(statusService.putStatus(status));
    }
  }
}
