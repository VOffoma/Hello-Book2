const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'username can not be an empty string'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'email can not be an empty string'
        },
        isEmail: {
          msg: 'Please enter a correct email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'password can not be an empty string'
        }
      }
    },
    role: {
      type: DataTypes.ENUM('User', 'Admin'),
      defaultValue: 'User',
      validate: {
        isIn: {
          args: ['User', 'Admin'],
          msg: 'role can be either be User or Admin'
        }
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        // User.belongsToMany(models.Book, { through: models.BorrowedBook, foreignKey: 'userId' });
      }
    },
  });

  User.afterValidate('myHookAfter', (user, options) => {
    user.password = bcrypt.hashSync(user.password, 10);
  });

  // Instance methods on the User Model
  User.prototype.comparePasswords = function comparePasswords(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
