import models from '../models';
import helper from '../helper';

/**
 * class for handling category operations
 */
class CategoryController {
  /**
   * Gets all categories from the database
   * @return {Object} response object
   */
  static async getAllCategories() {
    const allCategories = await models.Category.findAll({ attributes: ['id', 'name', 'description'] });
    if (allCategories.length === 0) {
      return ({ statusCode: 200, data: { message: 'There are no categories available presently', allCategories } });
    }
    return ({ statusCode: 200, data: { categories: allCategories } });
  }

  /**
   * Gets a category specified by an id from the database
   * @param {Object} req
   * @return {Object} response object
   */
  static async getCategory(req) {
    const category = await helper.hasCategory(req.params.categoryId);
    return ({ statusCode: 200, data: { category } });
  }

  /**
   * Gets all the books in a category
   * @param {Object} req
   * @return {Object} response object
   */
  static async getBooksInACategory(req) {
    const category = await helper.hasCategory(req.params.categoryId);
    const books = await models.Book.find({ where: { categoryId: category.id } });
    return ({ statusCode: 200, data: { books } });
  }

  /**
   * add a category to the database
   * @param {Object} req
   * @return {Object} response object
   */
  static async addCategory(req) {
    const [category, wasCreated] = await models.Category.findOrCreate({
      where: { name: req.body.name },
      defaults: { description: req.body.description }
    });
    if (wasCreated === true) {
      return ({ statusCode: 201, data: { message: 'category added successfully', newCategory: category } });
    }
    helper.throwError(409, `${category.name} already exists`);
  }

  /**
   * update a specified category
   * @param {*} req
   * @return {Object} object containing a modified category info
   */
  static async updateCategory(req) {
    const categoryToBeUpdated = await helper.hasCategory(req.params.categoryId);
    const updatedCategory = await categoryToBeUpdated.update(req.body);
    return ({ statusCode: 200, data: { message: `${updatedCategory.name} category has been modified successfully`, updatedCategory } });
  }
}

export default CategoryController;
