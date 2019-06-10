package com.eventpage.Controller;

import com.eventpage.Model.Event;
import com.eventpage.Service.EventService;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;
import org.hibernate.service.spi.ServiceException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
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
@RequestMapping("/event")
@CrossOrigin(origins = "*")
public class EventController {

  private EventService eventService;
  private static Logger log = Logger.getLogger("EventController");

  public EventController(EventService eventService) {
    this.eventService = eventService;
  }

  @GetMapping(value = "/all")
  public ResponseEntity getAll() throws ServiceException {
    return ResponseEntity.ok(eventService.getAll());
  }

  @GetMapping(value = "/id/{id}")
  public ResponseEntity getById(@PathVariable("id") String id) throws ServiceException {
    return ResponseEntity.ok(eventService.getById(id));
  }

  @GetMapping(value = "/name/{name}")
  public ResponseEntity getByTitle(@PathVariable("name") String name) throws ServiceException {
    return ResponseEntity.ok(eventService.getByTitle(name));
  }

  @GetMapping(value = "/{category}")
  public ResponseEntity getByCategory(@PathVariable("category") String category)
      throws ServiceException {
    return ResponseEntity.ok(eventService.getByCategory(category));
  }

  @GetMapping(value = "/dateFrom/{dateFrom}/dateTo/{dateTo}")
  public ResponseEntity getByDates(
      @PathVariable("dateFrom") @DateTimeFormat(iso = ISO.DATE) Date dateFrom,
      @PathVariable("dateTo") @DateTimeFormat(iso = ISO.DATE) Date dateTo) throws ServiceException {
    return ResponseEntity.ok(eventService.getByDates(dateFrom, dateTo));
  }

  @GetMapping(value = "/city/{city}")
  public ResponseEntity getByCity(@PathVariable("city") String city) throws ServiceException {
    return ResponseEntity.ok(eventService.getByCity(city));
  }

  @GetMapping(value = "search")
  public ResponseEntity getFromSearch(@RequestParam("cities") List<String> cities,
      @RequestParam("categories") List<String> categories,
      @RequestParam("places") List<String> places,
      @RequestParam("dateFrom") @DateTimeFormat(iso = ISO.DATE) Date dateFrom,
      @RequestParam("dateTo") @DateTimeFormat(iso = ISO.DATE) Date dateTo,
      @RequestParam("name") String name)
      throws ServiceException {
    return ResponseEntity
        .ok(eventService.getFromSearch(cities, categories, places, dateFrom, dateTo, name));
  }

  @DeleteMapping(value = "/delete/all")
  public ResponseEntity deleteAll() throws ServiceException {
    return ResponseEntity.ok(eventService.deleteAll());
  }

  @DeleteMapping(value = "delete/{id}")
  public ResponseEntity deleteById(@PathVariable("id") String id) throws ServiceException {
    return ResponseEntity.ok(eventService.deleteById(id));
  }

  @PostMapping
  public ResponseEntity createEvent(@RequestBody Event event) throws ServiceException {
    return ResponseEntity.ok(eventService.createEvent(event));
  }

  @PutMapping
  public ResponseEntity putEvent(@RequestBody Event event) throws ServiceException {
    return ResponseEntity.ok(eventService.putEvent(event));
  }
}
