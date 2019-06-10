package com.eventpage.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Category {

  private int id;
  @NotNull(message = "Name can not be null")
  private String name;

  private String description;

  @JsonIgnoreProperties("category")
  private Set<Event> events;


  public Category() {
  }

  public Category(String name, String description) {

    this.name = name;
    this.description = description;
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


  @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
  public Set<Event> getEvents() {
    return events;
  }

  public void setEvents(Set<Event> events) {
    this.events = events;
  }

  @Override
  public String toString() {
    String result = String.format(
        "Category[id=%d, name='%s', description = '%s']%n",
        id, name, description);
    if (events != null) {
      for (Event event : events) {
        result += event.toString();
      }
    }

    return result;
  }


}
