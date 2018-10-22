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
public class City {

  private int id;
  @NotNull(message = "Name can not be null")
  @Size(min = 3, max = 30, message = "Name must be between 3 and 30 characters")
  private String name;
  @JsonIgnoreProperties("city")
  private Set<Address> addresses;

  protected City() {
  }

  public City(String name) {
    this.name = name;
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

  @OneToMany(mappedBy = "city", cascade = CascadeType.ALL)
  public Set<Address> getAddresses() {
    return addresses;
  }

  public void setAddresses(Set<Address> addresses) {
    this.addresses = addresses;
  }

  @Override
  public String toString() {
    String result = String.format(
        "City[id=%d, name='%s']%n",
        id, name);
    if (addresses != null) {
      for (Address address : addresses) {
        result += address.toString();
      }
    }
    return result;
  }
}
