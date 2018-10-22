package com.eventpage.Service;

import com.eventpage.Model.User;
import com.eventpage.Model.UserDto;
import java.util.List;

public interface UserService {

  User save(UserDto user);

  List<User> findAll();

  User getByUserName(String userName);
}
