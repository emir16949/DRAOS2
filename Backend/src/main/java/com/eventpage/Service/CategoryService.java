package com.eventpage.Service;

import com.eventpage.Model.Category;
import com.eventpage.Repository.CategoryRepository;
import java.util.List;
import java.util.Optional;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

  private final CategoryRepository categoryRepository;

  @Autowired
  public CategoryService(CategoryRepository categoryRepository) {
    this.categoryRepository = categoryRepository;
  }


  public List<Category> getAll() throws ServiceException {
    try {
      return categoryRepository.findAll();
    } catch (Exception e) {
      throw new ServiceException("Cannot fetch all categories.");
    }
  }

  public Category getById(String id) throws ServiceException {
    try {
      Optional categoryHelp = categoryRepository.findById(Integer.parseInt(id));
      Category category = (Category) categoryHelp.get();

      return category;
    } catch (Exception e) {
      throw new ServiceException("Cannot find category with id={" + id + "}");
    }
  }

  public Category getByName(String title) throws ServiceException {
    try {
      for (Category category : categoryRepository.findAll()) {
        if (category.getName().equals(title)) {
          return category;
        }
      }
      return null;
    } catch (Exception e) {
      throw new ServiceException("Cannot find category with title={" + title + "}");
    }
  }

  public String deleteAll() throws ServiceException {
    try {
      categoryRepository.deleteAll();
      return "All categories deleted";

    } catch (Exception e) {
      throw new ServiceException("Cannon delete all categories");
    }

  }

  public String deleteById(String id) throws ServiceException {
    try {
      categoryRepository.deleteById(Integer.parseInt(id));
      return "category with id=" + id + " deleted";

    } catch (Exception e) {
      throw new ServiceException("Cannot delete category with id={" + id + "}");
    }

  }

  public String createCategory(Category category) throws ServiceException {
    try {
      categoryRepository.save(category);
      return "Category with name = " + category.getName() + " saved successfully";
    } catch (Exception e) {
      throw new ServiceException("Cannot create category with name = " + category.getName() + ".");
    }
  }

  public String putCategory(Category categoryFromRequest) throws ServiceException {
    try {
      Optional categoryHelp = categoryRepository.findById(categoryFromRequest.getId());
      Category category = (Category) categoryHelp.get();
      category.setName(categoryFromRequest.getName());
      categoryRepository.save(category);
      return "Category with id = " + category.getId() + " saved successfully as " + category
          .getName();
    } catch (Exception e) {
      throw new ServiceException(
          "Cannot update category with id = " + categoryFromRequest.getId() + ".");
    }
  }
}
