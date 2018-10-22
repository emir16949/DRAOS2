package com.eventpage.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Entity
public class Grade {

  private int id;

  @NotNull(message = "Grade can not be null")
  @Min(value = 1, message = "Grade can not be lower than 1")
  @Max(value = 5, message = "Grade can not be higher than 5")
  private int grade;

  @JsonIgnoreProperties("grades")
  private User user;

  @JsonIgnoreProperties("grades")
  private Event event;

  public Grade() {
  }

  public Grade(int gr) {
    this.grade = gr;
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public int getId() {
    return this.id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public int getGrade() {
    return grade;
  }

  public void setGrade(int grade) {
    this.grade = grade;
  }

  @ManyToOne
  @JoinColumn(name = "user_id")
  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  @ManyToOne
  @JoinColumn(name = "event_id")
  public Event getEvent() {
    return event;
  }

  public void setEvent(Event event) {
    this.event = event;
  }

  @Override
  public String toString() {
    return String.format(
        "Grade[id=%d, grade='%d']",
        id, grade);
  }
}
