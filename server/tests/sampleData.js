import faker from 'faker';
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
}

export default SampleData;
