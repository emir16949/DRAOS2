package com.eventpage.Controller;

import com.eventpage.Model.User;
import com.eventpage.Service.UserServiceForCRUD;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

  private UserServiceForCRUD userServiceForCRUD;

  public UserController(UserServiceForCRUD userServiceForCRUD) {
    this.userServiceForCRUD = userServiceForCRUD;
  }

  @GetMapping("/all")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity all() throws ServiceException {
    return ResponseEntity.ok(userServiceForCRUD.getAllUsers());
  }

  @GetMapping
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity getUser(@RequestParam(value = "id") String id) {
    return ResponseEntity.ok(userServiceForCRUD.getUser(id));
  }

  @PostMapping(value = "/create")
  public ResponseEntity createUser(@RequestBody User user) {
    return ResponseEntity.ok(userServiceForCRUD.createUser(user));
  }


  @DeleteMapping(value = "/delete/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity deleteUser(@PathVariable("id") String id) {
    return ResponseEntity.ok(userServiceForCRUD.deleteUser(id));
  }

  @DeleteMapping(value = "/delete/all")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity deleteAllUsers() {
    return ResponseEntity.ok(userServiceForCRUD.deleteAllUsers());
  }

  @PutMapping
  public ResponseEntity putChangeUser(@RequestBody User user) throws ServiceException {
    return ResponseEntity.ok(userServiceForCRUD.putChangeUser(user));
  }

  @PutMapping(value = "/withoutPassword")
  public ResponseEntity putChangeUserWithoutPassword(@RequestBody User user)
      throws ServiceException {
    return ResponseEntity.ok(userServiceForCRUD.putChangeUserWithoutPassword(user));
  }

  @GetMapping(value = "/username/{name}")
  public ResponseEntity getByTitle(@PathVariable("name") String name) throws ServiceException {
    return ResponseEntity.ok(userServiceForCRUD.getByUsername(name));

  }
}
