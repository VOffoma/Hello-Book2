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
    const allBooks = await models.Book.findAll({});
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
    const book = await models.Book.find({ where: { id: req.params.bookId } });
    if (book == null) {
      helper.throwError(404, 'there is no book with that id!');
    }
    return ({ statusCode: 200, data: { message: `book ${book.title} gotten successfully`, book } });
  }
}

export default BookController;
