package com.eventpage.Service;

import com.eventpage.Model.Comment;
import com.eventpage.Repository.CommentRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import jdk.nashorn.internal.parser.JSONParser;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

  private final CommentRepository commentRepository;

  @Autowired
  public CommentService(CommentRepository commentRepository) {
    this.commentRepository = commentRepository;
  }

  public List<Comment> getAll() throws ServiceException {
    try {
      return commentRepository.findAll();
    } catch (Exception e) {
      throw new ServiceException("Cannot fetch all comments.");
    }
  }

  public List<Comment> getByEventId(String id) throws ServiceException {
    try {
      List<Comment> comments = commentRepository.findAll();
      List<Comment> commentsSet = new ArrayList<>();

      for (Comment e : comments) {
        if (e.getEvent().getId() == Integer.parseInt(id)) {
          commentsSet.add(e);
        }
      }

      return commentsSet;
    } catch (Exception e) {
      throw new ServiceException("Cannot fetch all comments from event.");
    }
  }

  public String deleteAll() throws ServiceException {
    try {
      commentRepository.deleteAll();
      return "All comments deleted";

    } catch (Exception e) {
      throw new ServiceException("Cannon delete all comments");
    }
  }

  public String deleteById(String id) throws ServiceException {
    try {
      commentRepository.deleteById(Integer.parseInt(id));
      return "Comment with id=" + id + " deleted";

    } catch (Exception e) {
      throw new ServiceException("Cannot delete comment with id={" + id + "}");
    }
  }

  public String postByComment(Comment comment) throws ServiceException {
    try {
      commentRepository.save(comment);

      return JSONParser.quote("Comment = " + comment.getComment() + " saved successfully");
    } catch (Exception e) {
      throw new ServiceException(
          JSONParser.quote("Cannot save comment={" + comment.getComment() + "}"));
    }
  }

  public String putComment(Comment commentFromRequest) throws ServiceException {
    try {
      Optional commentHelp = commentRepository.findById(commentFromRequest.getId());
      Comment comment = (Comment) commentHelp.get();
      comment.setComment(commentFromRequest.getComment());
      commentRepository.save(comment);

      return "Comment with id= " + comment.getId() + " saved successfully as " + comment
          .getComment();
    } catch (Exception e) {
      throw new ServiceException(
          "Cannot update comment with id = " + commentFromRequest.getId() + ".");
    }
  }
}
