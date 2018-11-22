package com.eventpage.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Event {

  private int id;
  @NotNull(message = "Name can not be null")
  @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
  private String name;
  private Date dateTime;
  @Size(max = 255, message = "Description can not be longer than 255 characters")
  private String description;

  @JsonIgnoreProperties("events")
  private Category category;

  @JsonIgnoreProperties("events")
  private Place place;

  public Event() {
  }

  public Event(String name, String description) {
    this.name = name;
    this.description = description;

  }

  public Event(String name, String description, Category category, Place place) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.place = place;

  }

  @Id
  @NotNull
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
  @JoinColumn(name = "place_id")
  public Place getPlace() {
    return place;
  }

  public void setPlace(Place place) {
    this.place = place;
  }

  @ManyToOne
  @JoinColumn(name = "category_id")
  public Category getCategory() {
    return category;
  }

  public void setCategory(Category category) {
    this.category = category;
  }


  @Override
  public String toString() {
    String result = String.format(
        "Event[id=%d, title='%s', description = '%s']%n",
        id, name, description);

    return result;
  }

  public Date getDateTime() {
    return dateTime;
  }

  public void setDateTime(Date dateTime) {
    this.dateTime = dateTime;
  }
}