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
  private String name;
  private String description;
  private String address;
  private String place_url;
  private String picture;
  @JsonIgnoreProperties("places")
  private City city;
  @JsonIgnoreProperties("places")
  private User manager;
  @JsonIgnoreProperties("place")
  private Set<Event> events;

  protected Place() {
  }

  public Place(String name, String description) {
    this.name = name;
    this.description = description;
  }

  public Place(String name, String description, String address, City city) {
    this.name = name;
    this.description = description;
    this.city = city;
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

  public String getAddress() {    return address;  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getPicture() {
    return picture;
  }

  public void setPicture(String picture) {
    this.picture = picture;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getPlace_url() {
    return place_url;
  }

  public void setPlace_url(String place_url) {
    this.place_url = place_url;
  }

  @ManyToOne
  @JoinColumn(name = "city_id")
  public City getCity() {
    return this.city;
  }

  public void setCity(City city) {
    this.city = city;
  }

  @ManyToOne
  @JoinColumn(name = "manager_id")
  public User getManager() {
    return manager;
  }

  public void setManager(User manager) {
    this.manager = manager;
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
        "Place[id=%d, name='%s', description = '%s', picture= '%s']%n",
        id, name, description, picture);
    if (events != null) {
      for (Event event : events) {
        result += event.toString();
      }
    }

    return result;
  }
}