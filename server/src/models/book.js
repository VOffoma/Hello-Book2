module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'book title can not be an empty string'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 150],
          msg: 'book\'s author can not be an empty string'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 1000],
          msg: 'book\'s description can not be an empty string'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        // User.belongsToMany(models.Book, { through: models.BorrowedBook, foreignKey: 'userId' });
      }
    },
  });

  Book.afterValidate('myHookAfter', (book, options) => {
    book.isAvailable = (book.quantity > 0);
  });

  return Book;
};
