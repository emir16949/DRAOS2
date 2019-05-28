package com.eventpage.Service;

import com.eventpage.Model.Place;
import com.eventpage.Repository.PlaceRepository;
import java.util.List;
import java.util.Optional;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class PlaceService {

  private final PlaceRepository placeRepository;

  @Autowired
  PlaceService(PlaceRepository placeRepository) {
    this.placeRepository = placeRepository;
  }

  public List<Place> getAll() throws ServiceException {
    try {
      return placeRepository.findAll();
    } catch (Exception e) {
      throw new ServiceException("Cannot fetch all places.");
    }
  }

  public Place getById(String id) throws ServiceException {
    try {
      Optional placeHelp = placeRepository.findById(Integer.parseInt(id));
      Place place = (Place) placeHelp.get();
      return place;
    } catch (Exception e) {
      throw new ServiceException("Cannot find place with id = " + id + ".");
    }
  }

  public Place getByName(String name) throws ServiceException {
    try {
      for (Place place : placeRepository.findAll()) {
        if (place.getName().equals(name)) {
          return place;
        }
      }
      // In case it did not find a place with given name
      throw new Exception();
    } catch (Exception e) {
      throw new ServiceException("Cannot find place with name = " + name + ".");
    }
  }

  @Bean
  public RestTemplate restTemplate(RestTemplateBuilder builder) {
    return builder.build();
  }

  public String deleteAll() throws ServiceException {
    try {
      placeRepository.deleteAll();
      return "All places deleted";
    } catch (Exception e) {
      throw new ServiceException("Cannot delete all places");
    }
  }

  public String deleteById(String id) throws ServiceException {
    try {
      placeRepository.deleteById(Integer.parseInt(id));
      return "Place with id = " + id + " deleted";
    } catch (Exception e) {
      throw new ServiceException("Cannot delete place with id = " + id + ".");
    }
  }

  public String postNewPlace(Place place) throws ServiceException {
    try {
      placeRepository.save(place);
      return "Place with name = " + place.getName() + " saved successfully";
    } catch (Exception e) {
      throw new ServiceException("Cannot create place with name = " + place.getName() + ".");
    }
  }

  public String putChangePlace(Place placeFromRequest) throws ServiceException {
    try {
      Optional placeHelp = placeRepository.findById(placeFromRequest.getId());
      Place place = (Place) placeHelp.get();
      place.setName(placeFromRequest.getName());
      place.setDescription(placeFromRequest.getDescription());
      place.setAddress(placeFromRequest.getAddress());
      place.setPlace_url(placeFromRequest.getPlace_url());
      placeRepository.save(place);
      return "Place with id = " + place.getId() + " and name = " + place.getName()
          + " updated successfully";
    } catch (Exception e) {
      throw new ServiceException("Cannot update place with id = " + placeFromRequest.getId() + ".");
    }
  }
}
