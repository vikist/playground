package com.vikist.playserver.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Greetings")
public class Greeting {

  @Id
  @GeneratedValue(generator = "greeting_generator")
  @SequenceGenerator(
      name = "greeting_generator",
      sequenceName = "greeting_generator",
      initialValue = 1000
  )
  private Long id;

  @NotBlank
  @Size(max = 100)
  private String name;

  public Greeting() {

  }

  public Greeting(String name) {
    this.name = name;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
