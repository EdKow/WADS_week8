const { Sequelize } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize('todo_db', 'postgres', 'Kow36edw', { //'database_name', 'username', 'password'
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false // Set to console.log to see SQL queries
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;
