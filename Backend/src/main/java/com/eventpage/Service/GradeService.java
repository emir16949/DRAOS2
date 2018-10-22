package com.eventpage.Service;

import com.eventpage.Model.Grade;
import com.eventpage.Model.User;
import com.eventpage.Repository.GradeRepository;
import com.eventpage.Repository.UserRepository;
import java.util.List;
import jdk.nashorn.internal.parser.JSONParser;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GradeService {

  private final GradeRepository gradeRepository;
  private final UserRepository userRepository;

  @Autowired
  public GradeService(GradeRepository gradeRepository, UserRepository userRepository) {
    this.gradeRepository = gradeRepository;
    this.userRepository = userRepository;
  }

  public List<Grade> getAll() throws ServiceException {
    try {
      return gradeRepository.findAll();
    } catch (Exception e) {
      throw new ServiceException("Cannot fetch all grades.");
    }
  }

  public float getAverageGradeForEvent(String id) throws ServiceException {
    try {
      List<Grade> grades = gradeRepository.findAll();
      float averageGrade = 0;
      int count = 0;

      for (Grade e : grades) {
        if (e.getEvent().getId() == Integer.parseInt(id)) {
          count++;
          averageGrade += e.getGrade();
        }
      }

      return averageGrade / count;
    } catch (Exception e) {
      throw new ServiceException("Cannot find grade with id={" + id + "}");
    }
  }

  public String deleteAll() throws ServiceException {
    try {
      gradeRepository.deleteAll();
      return "All grades deleted";

    } catch (Exception e) {
      throw new ServiceException("Cannon delete all grades");
    }
  }

  public String deleteById(String id) throws ServiceException {
    try {
      gradeRepository.deleteById(Integer.parseInt(id));
      return "Grade with id=" + id + " deleted";

    } catch (Exception e) {
      throw new ServiceException("Cannot delete grade with id={" + id + "}");
    }
  }

  public String createGrade(Grade grade) throws ServiceException {
    try {
      gradeRepository.save(grade);

      return JSONParser.quote("Grade = " + grade.getGrade() + " saved successfully");
    } catch (Exception e) {
      throw new ServiceException("Cannot create grade = " + grade.getGrade() + ".");
    }
  }

  public String putGrade(Grade gradeFromRequest) throws ServiceException {
    try {
      Grade grade = getGradeByUserId(gradeFromRequest.getUser().getId(),
          gradeFromRequest.getEvent().getId());
      grade.setGrade(gradeFromRequest.getGrade());
      gradeRepository.save(grade);

      return JSONParser
          .quote("Grade with id= " + grade.getId() + " saved successfully as " + grade.getGrade());
    } catch (Exception e) {
      throw new ServiceException(
          JSONParser.quote("Cannot update grade with id = " + gradeFromRequest.getId() + "."));
    }
  }

  public Grade getGradeByUserId(Integer userId, Integer eventid) throws ServiceException {
    try {
      List<Grade> grades = gradeRepository.findAll();
      Grade returnGrade = null;

      for (Grade g : grades) {
        if (g.getUser().getId() == userId && g.getEvent().getId() == eventid) {
          returnGrade = g;
        }
      }
      return returnGrade;
    } catch (Exception e) {
      throw new ServiceException(JSONParser.quote("Cannot find grade"));
    }
  }

  public Grade getGradeByUserUsername(String username, Integer eventid) throws ServiceException {
    try {
      User user = userRepository.findByUsername(username).get();

      List<Grade> grades = gradeRepository.findAll();
      Grade returnGrade = null;

      for (Grade g : grades) {
        if (g.getUser().getUsername().equals(username) && g.getEvent().getId() == eventid) {
          returnGrade = g;
        }
      }
      return returnGrade;
    } catch (Exception e) {
      throw new ServiceException(JSONParser.quote("Cannot find grade"));
    }
  }
}
