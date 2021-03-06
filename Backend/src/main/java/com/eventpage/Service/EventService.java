package com.eventpage.Service;

import com.eventpage.Model.Category;
import com.eventpage.Model.Event;
import com.eventpage.Model.Place;
import com.eventpage.Repository.EventRepository;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.logging.Logger;
import jdk.nashorn.internal.parser.JSONParser;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class EventService {

  private final EventRepository eventRepository;
  private static Logger log = Logger.getLogger("EventService");

  @Autowired
  public EventService(EventRepository eventRepository) {
    this.eventRepository = eventRepository;
  }

  public List<Event> getAll() throws ServiceException {
    try {
      List<Event> events = eventRepository.findAll();
      Collections.sort(events, new SortByDate());
      return events;
    } catch (Exception e) {
      throw new ServiceException("Cannot fetch all events.");
    }
  }

  public Event getById(String id) throws ServiceException {
    try {
      Optional eventHelp = eventRepository.findById(Integer.parseInt(id));
      Event event = (Event) eventHelp.get();
      return event;
    } catch (Exception e) {
      throw new ServiceException("Cannot find event with id={" + id + "}");
    }
  }

  public List<Event> getByCategory(String category) throws ServiceException {
    try {
      List<Event> events = eventRepository.findAll();
      List<Event> eventsList = new ArrayList<>();

      for (Event e : events) {
        if (e.getCategory().getName().equals(category) && e.getDate_time()
            .after(Calendar.getInstance().getTime())) {
          eventsList.add(e);
        }
      }

      Collections.sort(eventsList, new SortByDate());

      return new ArrayList<>(eventsList);
    } catch (Exception e) {
      throw new ServiceException("Cannot fetch all events.");
    }
  }

  public List<Event> getByTitle(String title) throws ServiceException {
    try {
      List<Event> events = eventRepository.findAll();
      Set<Event> eventsSet = new HashSet<>();
      boolean exist = false;

      for (Event e : events) {
        if (e.getName().equals(title) && e.getDate_time().after(Calendar.getInstance().getTime())) {
          eventsSet.add(e);
          exist = true;
        }
      }

      if (exist == false) {
        return null;
      } else {
        return new ArrayList<>(eventsSet);
      }
    } catch (Exception e) {
      throw new ServiceException("Cannot find event with title={" + title + "}");
    }
  }

  public List<Event> getByDates(Date dateFrom, Date dateTo) {
    try {
      List<Event> events = eventRepository.findAll();
      Set<Event> eventsSet = new HashSet<>();
      Calendar calendar = Calendar.getInstance();
      calendar.setTime(dateFrom);
      calendar.set(Calendar.MILLISECOND, 0);
      calendar.set(Calendar.SECOND, 0);
      calendar.set(Calendar.MINUTE, 0);
      calendar.set(Calendar.HOUR_OF_DAY, 0);
      dateFrom.setTime(calendar.getTimeInMillis() - 1);
      calendar.setTime(dateTo);
      calendar.set(Calendar.MILLISECOND, 999);
      calendar.set(Calendar.SECOND, 59);
      calendar.set(Calendar.MINUTE, 59);
      calendar.set(Calendar.HOUR_OF_DAY, 23);
      dateTo.setTime(calendar.getTimeInMillis() + 1);

      for (Event e : events) {
        if (e.getDate_time().after(dateFrom) && e.getDate_time().before(dateTo)) {
          eventsSet.add(e);
        }
      }
      return new ArrayList<>(eventsSet);
    } catch (Exception e) {
      throw new ServiceException("Cannot find events");
    }
  }

  public List<Event> getByCity(String city) throws ServiceException {
    try {
      List<Event> events = eventRepository.findAll();
      Set<Event> eventsSet = new HashSet<>();

      for (Event e : events) {
        if (e.getPlace().getCity().getName().equals(city) && e.getDate_time()
            .after(Calendar.getInstance().getTime())) {
          eventsSet.add(e);
        }
      }

      return new ArrayList<>(eventsSet);
    } catch (Exception e) {
      throw new ServiceException("Cannot find events with city={" + city + "}");
    }
  }

  public List<Event> getFromSearch(List<String> cities, List<String> categories,
      List<String> places,
      Date dateFrom, Date dateTo, String name) throws ServiceException {
    try {
      List<Event> events = eventRepository.findAll();
      Set<Event> eventsSet = new HashSet<>();
      if (dateFrom != null && dateTo != null) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(dateFrom);
        calendar.set(Calendar.MILLISECOND, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        dateFrom.setTime(calendar.getTimeInMillis() - 1);
        calendar.setTime(dateTo);
        calendar.set(Calendar.MILLISECOND, 999);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        dateTo.setTime(calendar.getTimeInMillis() + 1);
      }

      for (Event e : events) {
        if (cities != null && cities.contains(e.getPlace().getCity().getName()) || cities == null) {
          if (categories != null && categories.contains(e.getCategory().getName())
              || categories == null) {
            if (places != null && places.contains(e.getPlace().getName()) || places == null) {
              if ((dateFrom != null && dateTo != null) && (e.getDate_time().after(dateFrom) && e
                  .getDate_time().before(dateTo)) || (dateFrom == null && dateTo == null)) {
                if (name != null && uporediNazive(name, e.getName()) || name == null) {
                  if (e.getDate_time().after(Calendar.getInstance().getTime())) {
                    eventsSet.add(e);
                  }
                }
              }
            }
          }
        }
      }
      return new ArrayList<>(eventsSet);
    } catch (Exception e) {
      throw new ServiceException("Cannot find events");
    }
  }

  private boolean uporediNazive(String searchName, String eventName) {
    String[] searchNameWords = searchName.split("\\s+");
    String[] eventNameWords = eventName.split("\\s+");
    for (String searchNameWord : searchNameWords) {
      for (String eventNameWord : eventNameWords) {
        if (searchNameWord.equals(eventNameWord)) {
          return true;
        }
      }
    }
    return false;
  }

  @Bean
  public RestTemplate restTemplate(RestTemplateBuilder builder) {
    return builder.build();
  }

  public String deleteAll() throws ServiceException {
    try {
      eventRepository.deleteAll();
      return "All events deleted";
    } catch (Exception e) {
      throw new ServiceException("Cannon delete all events");
    }
  }

  public String deleteById(String id) throws ServiceException {
    try {
      eventRepository.deleteById(Integer.parseInt(id));
      return "Event with id=" + id + " deleted";
    } catch (Exception e) {
      throw new ServiceException("Cannot delete event with id={" + id + "}");
    }
  }

  public String createEvent(Event event) throws ServiceException {
    try {
      eventRepository.save(event);
      return JSONParser.quote("Event with name = " + event.getName() + " saved successfully");
    } catch (Exception e) {
      throw new ServiceException("Cannot create event with name = " + event.getName() + ".");
    }
  }

  public String putEvent(Event eventFromRequest) throws ServiceException {
    try {
      Optional eventHelp = eventRepository.findById(eventFromRequest.getId());
      Event event = (Event) eventHelp.get();
      event.setName(eventFromRequest.getName());
      event.setDate_time(eventFromRequest.getDate_time());
      event.setPicture(eventFromRequest.getPicture());
      event.setDescription(eventFromRequest.getDescription());
      event.setCategory(eventFromRequest.getCategory());
      event.setPlace(eventFromRequest.getPlace());
      event.setPrice(eventFromRequest.getPrice());
      eventRepository.save(event);
      return "Event with id = " + event.getId() + " saved successfully as " + event.getName();
    } catch (Exception e) {
      throw new ServiceException(
          "Cannot update event with id = " + eventFromRequest.getId() + ".");
    }
  }
}

class SortByDate implements Comparator<Event> {

  public int compare(Event a, Event b) {
    return a.getDate_time().compareTo(b.getDate_time());
  }
}