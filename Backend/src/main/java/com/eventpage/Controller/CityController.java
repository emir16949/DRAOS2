package com.eventpage.Controller;

import com.eventpage.Model.City;
import com.eventpage.Service.CityService;
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
@RequestMapping("/city")
@CrossOrigin(origins = "*")
public class CityController {

  private CityService cityService;

  public CityController(CityService cityService) {
    this.cityService = cityService;
  }

  @GetMapping(value = "/all")
  public ResponseEntity getAll() throws ServiceException {
    return ResponseEntity.ok(cityService.getAll());
  }

  @GetMapping(value = "/id/{id}")
  public ResponseEntity getById(@PathVariable("id") String id) throws ServiceException {
    return ResponseEntity.ok(cityService.getById(id));
  }

  @GetMapping(value = "/name/{name}")
  public ResponseEntity getByName(@PathVariable("name") String name) throws ServiceException {
    return ResponseEntity.ok(cityService.getByName(name));
  }

  @DeleteMapping(value = "/all")
  @PreAuthorize("@tokenAuthenticationService.isAdmin()")
  public ResponseEntity deleteAll() throws ServiceException {
    return ResponseEntity.ok(cityService.deleteAll());
  }

  @DeleteMapping(value = "/id/{id}")
  @PreAuthorize("@tokenAuthenticationService.isAdmin()")
  public ResponseEntity deleteById(@PathVariable("id") String id) throws ServiceException {
    return ResponseEntity.ok(cityService.deleteById(id));
  }

  @PostMapping
  @PreAuthorize("@tokenAuthenticationService.isAdmin()")
  public ResponseEntity postNewCity(@RequestBody City city) throws ServiceException {
    return ResponseEntity.ok(cityService.postNewCity(city));
  }

  @PutMapping
  @PreAuthorize("@tokenAuthenticationService.isAdmin()")
  public ResponseEntity putChangeCity(@RequestBody City city) throws ServiceException {
    return ResponseEntity.ok(cityService.putChangeCity(city));
  }
}
