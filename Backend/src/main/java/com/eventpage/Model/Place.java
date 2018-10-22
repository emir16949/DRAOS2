package com.eventpage.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Place {

  private int id;
  @NotNull(message = "Name can not be null")
  @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
  private String name;
  @Size(max = 255, message = "Description can not be longer than 255 characters")
  private String description;
  @JsonIgnoreProperties("places")
  private Address address;
  @JsonIgnoreProperties("place")
  private Set<Event> events;

  protected Place() {
  }

  public Place(String name, String description) {
    this.name = name;
    this.description = description;
  }

  public Place(String name, String description, Address address) {
    this.name = name;
    this.description = description;
    this.address = address;
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  @ManyToOne
  @JoinColumn(name = "address_id")
  public Address getAddress() {
    return address;
  }

  public void setAddress(Address address) {
    this.address = address;
  }

  @OneToMany(mappedBy = "place", cascade = CascadeType.ALL)
  public Set<Event> getEvents() {
    return events;
  }

  public void setEvents(Set<Event> events) {
    this.events = events;
  }

  @Override
  public String toString() {
    String result = String.format(
        "Place[id=%d, name='%s', description = '%s']%n",
        id, name, description);
    if (events != null) {
      for (Event event : events) {
        result += event.toString();
      }
    }

    return result;
  }
}