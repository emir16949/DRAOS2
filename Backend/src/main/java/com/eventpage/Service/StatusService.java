package com.eventpage.Service;

import com.eventpage.Model.Status;
import com.eventpage.Repository.StatusRepository;
import java.util.List;
import java.util.Optional;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusService {

  private final StatusRepository statusRepository;

  @Autowired
  public StatusService(StatusRepository statusRepository) {
    this.statusRepository = statusRepository;
  }

  public List<Status> getAll() throws ServiceException {
    try {
      return statusRepository.findAll();
    } catch (Exception e) {
      throw new ServiceException("Cannot fetch all statuses.");
    }
  }

  public Status getById(String id) throws ServiceException {
    try {
      Optional statusHelp = statusRepository.findById(Integer.parseInt(id));
      Status status = (Status) statusHelp.get();

      return status;
    } catch (Exception e) {
      throw new ServiceException("Cannot find status with id={" + id + "}");
    }
  }

  public String deleteAll() throws ServiceException {
    try {
      statusRepository.deleteAll();
      return "All statuses deleted";

    } catch (Exception e) {
      throw new ServiceException("Cannon delete all statuses");
    }
  }

  public String deleteById(String id) throws ServiceException {
    try {
      statusRepository.deleteById(Integer.parseInt(id));
      return "Status with id=" + id + " deleted";

    } catch (Exception e) {
      throw new ServiceException("Cannot delete status with id={" + id + "}");
    }
  }

  public String createStatus(Status status) throws ServiceException {
    try {
      statusRepository.save(status);

      return "Status = " + status.getStatus() + " saved successfully";
    } catch (Exception e) {
      throw new ServiceException("Cannot create status = " + status.getStatus() + ".");
    }
  }

  public String putStatus(Status statusFromRequest) throws ServiceException {
    try {
      Optional statusHelp = statusRepository.findById(statusFromRequest.getId());
      Status status = (Status) statusHelp.get();
      status.setStatus(statusFromRequest.getStatus());
      statusRepository.save(status);

      return "Status with id= " + status.getId() + " saved successfully as " + status.getStatus();
    } catch (Exception e) {
      throw new ServiceException(
          "Cannot update status with id = " + statusFromRequest.getId() + ".");
    }
  }
}
