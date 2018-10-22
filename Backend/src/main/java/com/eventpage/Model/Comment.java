package com.eventpage.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Comment {

  private int id;
  @NotNull(message = "Comment can not be null")
  @Size(min = 2, max = 255, message = "Comment must be between 2 and 255 char")
  private String comment;
  @JsonIgnoreProperties("comments")
  private User user;
  @JsonIgnoreProperties("comments")
  private Event event;

  protected Comment() {
  }

  public Comment(String co) {
    this.comment = co;
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public int getId() {
    return this.id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
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
        "Comment[id=%d, comment='%s']",
        id, comment);
  }
}
