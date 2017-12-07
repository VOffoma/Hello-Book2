require('dotenv').config();

module.exports = {
  development: {
    username: process.env.LOCAL_USERNAME,
    password: process.env.LOCAL_PASSWORD,
    database: process.env.LOCAL_DATABASE,
    host: '127.0.0.1',
    dialect: 'postgres',
    seederStorageTableName: 'sequelize_data'
  },
  test: {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DATABASE,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: process.env.DATABASE_URL
  }
};
