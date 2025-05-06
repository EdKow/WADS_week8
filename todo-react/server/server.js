const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const Todo = require('./models/Todo');
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');
const { authenticateToken } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sync database
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
});

// Todo routes
app.get('/api/todos', authenticateToken, async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { userId: req.user.id } });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/todos', authenticateToken, async (req, res) => {
  try {
    const todo = await Todo.create({ ...req.body, userId: req.user.id });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/todos/:id', authenticateToken, async (req, res) => {
  try {
    const todo = await Todo.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (todo) {
      await todo.update(req.body);
      res.json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/todos/:id', authenticateToken, async (req, res) => {
  try {
    const todo = await Todo.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (todo) {
      await todo.destroy();
      res.json({ message: 'Todo deleted' });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Auth routes
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 