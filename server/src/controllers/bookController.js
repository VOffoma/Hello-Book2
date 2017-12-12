import models from '../models';
import helper from '../helper';

/**
 * class for handling book operations
 */
class BookController {
  /**
   * Gets all books from the database
   * @return {Object} response object
   */
  static async getAllBooks() {
    const allBooks = await models.Book.findAll({ attributes: ['id', 'title', 'author', 'description'] });
    if (allBooks.length === 0) {
      return ({ statusCode: 200, data: { message: 'There are no books available presently', allBooks } });
    }
    return ({ statusCode: 200, data: { books: allBooks } });
  }

  /**
   * Gets a book specified by an id from the database
   * @param {Object} req
   * @return {Object} response object
   */
  static async getBook(req) {
    const book = await helper.hasBook(req.params.bookId);
    return ({ statusCode: 200, data: { message: `book ${book.title} gotten successfully`, book } });
  }

  /**
   * add a book to the database
   * @param {Object} req
   * @return {Object} response object
   */
  static async addBook(req) {
    const [book, wasCreated] = await models.Book.findOrCreate({
      where: { title: req.body.title, author: req.body.author },
      defaults: {
        description: req.body.description,
        quantity: parseInt(req.body.quantity, 0),
        categoryId: parseInt(req.body.quantity, 0)
      },
    });
    if (wasCreated === true) {
      return ({ statusCode: 201, data: { message: 'book added successfully', newBook: book } });
    }
    helper.throwError(409, `${book.title} by ${book.author} already exists`);
  }

  /**
   * update a specified book
   * @param {*} req
   * @return {Object} object containing a modified book info
   */
  static async updateBook(req) {
    const bookToBeUpdated = await helper.hasBook(req.params.bookId);
    const updatedBook = await bookToBeUpdated.update(req.body);
    return ({ statusCode: 200, data: { message: `book ${updatedBook.title} has been modified successfully`, updatedBook } });
  }
}

export default BookController;
