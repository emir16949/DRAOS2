package com.eventpage.Repository;

import com.eventpage.Model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

  List<User> findByPrezime(String prezime);

  Optional<User> findByUsername(String username);

}
