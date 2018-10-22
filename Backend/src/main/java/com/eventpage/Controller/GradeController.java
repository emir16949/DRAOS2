package com.eventpage.Controller;

import com.eventpage.Model.Grade;
import com.eventpage.Repository.UserRepository;
import com.eventpage.Security.TokenAuthenticationService;
import com.eventpage.Service.GradeService;
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
@RequestMapping("/grade")
@CrossOrigin(origins = "*")
public class GradeController {

  private GradeService gradeService;
  private UserRepository userRepository;

  public GradeController(GradeService gradeService, UserRepository userRepository) {
    this.gradeService = gradeService;
    this.userRepository = userRepository;
  }

  @GetMapping(value = "/all")
  public ResponseEntity getAll() throws ServiceException {
    return ResponseEntity.ok(gradeService.getAll());
  }

  @GetMapping(value = "/{id}")
  public ResponseEntity getById(@PathVariable("id") String id) throws ServiceException {
    return ResponseEntity.ok(gradeService.getAverageGradeForEvent(id));
  }

  @GetMapping(value = "/user/{username}/event/{eventid}")
  public Grade getGradeByUserId(@PathVariable("username") String username,
      @PathVariable("eventid") Integer eventid) throws ServiceException {
    return gradeService.getGradeByUserUsername(username, eventid);
  }

  @DeleteMapping(value = "/delete/all")
  @PreAuthorize("@tokenAuthenticationService.isAdmin()")
  public ResponseEntity deleteAll() throws ServiceException {
    return ResponseEntity.ok(gradeService.deleteAll());
  }

  @DeleteMapping(value = "delete/{id}")
  @PreAuthorize("@tokenAuthenticationService.isAdmin()")
  public ResponseEntity deleteById(@PathVariable("id") String id) throws ServiceException {
    return ResponseEntity.ok(gradeService.deleteById(id));
  }

  @PostMapping(value = "/create")
  public ResponseEntity postByGrade(@RequestBody Grade grade) throws ServiceException {
    String usernameFromRequest = userRepository.findById(grade.getUser().getId()).get()
        .getUsername();
    String usernameFromToken = TokenAuthenticationService.getTokenUsername();
    if (!usernameFromRequest.equals(usernameFromToken) && !TokenAuthenticationService.isAdmin()) {
      throw new ServiceException("Not allowed to do changes");
    } else {
      return ResponseEntity.ok(gradeService.createGrade(grade));
    }
  }

  @PutMapping
  public ResponseEntity putById(@RequestBody Grade grade) throws ServiceException {
    String usernameFromRequest = userRepository.findById(grade.getUser().getId()).get()
        .getUsername();
    String usernameFromToken = TokenAuthenticationService.getTokenUsername();
    if (!usernameFromRequest.equals(usernameFromToken) && !TokenAuthenticationService.isAdmin()) {
      throw new ServiceException("Not allowed to do changes");
    } else {
      return ResponseEntity.ok(gradeService.putGrade(grade));
    }
  }
}
