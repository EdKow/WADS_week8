const express = require('express');
const sequelize = require('./db');
const todoRoutes = require('./routes/todoRoutes');
const { logger, errorHandler } = require('./middleware/auth');

const app = express();

const cors = require('cors');
app.use(cors());


app.use(express.json());
app.use(logger);

app.use('/todos', todoRoutes);

app.use(errorHandler); // Must go last

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // { force: true } for reset
    console.log('✅ Database synced');

    app.listen(3000, () => {
      console.log('🚀 Server running on http://localhost:3000');
    });
  } catch (err) {
    console.error('❌ Startup error:', err);
  }
}

start();
