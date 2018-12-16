package com.eventpage.Service;

import com.eventpage.Model.User;
import com.eventpage.Repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UserServiceForCRUD {

  private final UserRepository userRepository;
  private final BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();

  @Autowired
  public UserServiceForCRUD(UserRepository usersRepository) {
    this.userRepository = usersRepository;
  }

  public List<User> getAllUsers() throws ServiceException {
    try {
      List<User> users = userRepository.findAll();
      return users;
    } catch (Exception e) {
      throw new ServiceException("Cannot fetch all users.");
    }
  }

  public User getUser(String id) throws ServiceException {
    try {
      Optional user = userRepository.findById(Integer.parseInt(id));
      User u = (User) user.get();
      return u;
    } catch (Exception e) {
      throw new ServiceException("Cannot find user with id={" + id + "}");
    }
  }

  @Bean
  public RestTemplate restTemplate(RestTemplateBuilder builder) {
    return builder.build();
  }

  public User createUser(User user) throws ServiceException {
    try {
      user.setPassword(bcrypt.encode(user.getPassword()));
      User u = userRepository.save(user);
      return u;
    } catch (Exception e) {
      throw new ServiceException("Cannot create user");
    }
  }

  public String deleteUser(String id) throws ServiceException {
    try {
      userRepository.deleteById(Integer.parseInt(id));
      return "User deleted";
    } catch (Exception e) {
      throw new ServiceException("Cannot delete user with id={" + id + "}");
    }
  }

  public String deleteAllUsers() throws ServiceException {
    try {
      userRepository.deleteAll();
      String s = "Users deleted";
      return s;
    } catch (Exception e) {
      throw new ServiceException("Cannon delete all users");
    }
  }

  public String putChangeUser(User u) throws ServiceException {
    try {
      Optional userHelp = userRepository.findById(u.getId());
      User user = (User) userHelp.get();
      user.setIme(u.getIme());
      user.setPrezime(u.getPrezime());
      user.setEmail(u.getEmail());
      userRepository.save(user);
      return "\"User with id = " + u.getId() + " saved successfully\"";
    } catch (Exception e) {
      throw new ServiceException("Cannot update user with id = " + u.getId() + ".");
    }
  }

  public List<User> getByUsername(String username) throws ServiceException {
    try {
      List<User> users = userRepository.findAll();
      List<User> result = new ArrayList<>();

      for (User user : users) {
        if (user.getUsername().equals(username)) {
          result.add(user);
        }
      }

      return result;
    } catch (Exception e) {
      throw new ServiceException("Cannot find any user with username={" + username + "}");
    }
  }
}
