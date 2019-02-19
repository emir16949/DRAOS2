package com.eventpage.Controller;
/*
import com.eventpage.Model.Address;
import com.eventpage.Service.AddressService;
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
@RequestMapping("/address")
@CrossOrigin(origins = "*")
public class AddressController {

  private AddressService addressService;

  public AddressController(AddressService addressService) {
    this.addressService = addressService;
  }

  @GetMapping(value = "/all")
  public ResponseEntity getAll() throws ServiceException {
    return ResponseEntity.ok(addressService.getAll());
  }

  @GetMapping(value = "/id/{id}")
  public ResponseEntity getById(@PathVariable("id") String id) throws ServiceException {
    return ResponseEntity.ok(addressService.getById(id));
  }

  @GetMapping(value = "/name/{name}")
  public ResponseEntity getByName(@PathVariable("name") String name) throws ServiceException {
    return ResponseEntity.ok(addressService.getByName(name));
  }

  @DeleteMapping(value = "/all")
  @PreAuthorize("@tokenAuthenticationService.isAdmin()")
  public ResponseEntity deleteAll() throws ServiceException {
    return ResponseEntity.ok(addressService.deleteAll());
  }

  @DeleteMapping(value = "/id/{id}")
  @PreAuthorize("@tokenAuthenticationService.isAdmin()")
  public ResponseEntity deleteById(@PathVariable("id") String id) throws ServiceException {
    return ResponseEntity.ok(addressService.deleteById(id));
  }

  @PostMapping
  @PreAuthorize("@tokenAuthenticationService.isAdmin()")
  public ResponseEntity postNewAddress(@RequestBody Address address) throws ServiceException {
    return ResponseEntity.ok(addressService.postNewAddress(address));
  }

  @PutMapping
  @PreAuthorize("@tokenAuthenticationService.isAdmin()")
  public ResponseEntity putChangeAddress(@RequestBody Address address) throws ServiceException {
    return ResponseEntity.ok(addressService.putChangeAddress(address));
  }
}
*/