package com.eventpage.Service;

import com.eventpage.Model.User;
import com.eventpage.Model.UserDto;
import com.eventpage.Repository.RoleRepository;
import com.eventpage.Repository.UserRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service(value = "userDetailsService")
public class UserServiceImpl implements UserDetailsService, UserService {

  private final UserRepository userDao;
  private final RoleRepository roleRepository;
  private final BCryptPasswordEncoder bcryptEncoder;

  @Autowired
  public UserServiceImpl(UserRepository userDao, BCryptPasswordEncoder bcryptEncoder,
      RoleRepository roleRepository) {
    this.userDao = userDao;
    this.bcryptEncoder = bcryptEncoder;
    this.roleRepository = roleRepository;
  }

  private static List<SimpleGrantedAuthority> getAuthority(User user) {
    return Arrays.asList(new SimpleGrantedAuthority(user.getUser_role().getRole()));
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userDao
        .findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException(
            String.format("No user found with username '%s'.", username)));

    return new org.springframework.security.core.userdetails.User(user.getUsername(),
        user.getPassword(),
        getAuthority(user)
    );
  }

  @Override
  public List<User> findAll() {
    List<User> list = new ArrayList<>();
    userDao.findAll().iterator().forEachRemaining(list::add);
    return list;
  }

  @Override
  public User getByUserName(String userName) {
    User user = userDao
        .findByUsername(userName)
        .orElseThrow(() -> new UsernameNotFoundException("Invalid username."));

    return user;
  }

  @Override
  public User save(UserDto user) {
    User newUser = new User();
    newUser.setUsername(user.getUsername());
    newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
    newUser.setUser_role(roleRepository.findByRole("ROLE_USER").get());
    return userDao.save(newUser);
  }
}
