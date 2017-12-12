import faker from 'faker';
import helper from '../src/helper';

/**
 * class for populating the database
 */
class SampleData {
  /**
   *@description create dummy data for book model
   * @param {number} noOfRecords
   * @return {array} dummyBooks
   */
  static generateDummyBooks(noOfRecords) {
    const dummyBooks = [];
    for (let i = 0; i < noOfRecords; i += 1) {
      dummyBooks.push({
        title: faker.name.title(),
        author: `${faker.name.firstName()} ${faker.name.lastName()}`,
        description: faker.lorem.sentence(),
        quantity: faker.random.number()
      });
    }
    return dummyBooks;
  }


  /**
   *@description create a single dummy book
   * @return {object} dummyBook
   */
  static generateADummyBook() {
    const dummyBook = {
      title: faker.name.title(),
      author: `${faker.name.firstName()} ${faker.name.lastName()}`,
      description: faker.lorem.sentence(),
      quantity: faker.random.number()
    };
    return dummyBook;
  }


  /**
   *@description create dummy data for user model
   * @param {number} noOfRecords
   * @return {array} dummyUsers
   */
  static generateDummyUsers(noOfRecords) {
    const dummyUsers = [];
    for (let i = 0; i < noOfRecords; i += 1) {
      dummyUsers.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'User'
      });
    }
    return dummyUsers;
  }

  /**
   *@description create a single dummy user
   * @return {object} dummyUser
   */
  static generateADummyUser() {
    const dummyUser = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'User'
    };
    return dummyUser;
  }

  /**
   *@description create a single dummy user
   * @return {object} dummyUser
   */
  static generateDummyToken() {
    const dummyUser = this.generateADummyUser();
    dummyUser.id = 1;
    dummyUser.role = 'Admin';
    const dummyToken = helper.createToken(dummyUser);
    return dummyToken;
  }

  /**
   *@description create a single dummy user
   * @return {object} dummyUser
   */
  static generateADummyCategory() {
    const dummyCategory = {
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };
    return dummyCategory;
  }
}

export default SampleData;
