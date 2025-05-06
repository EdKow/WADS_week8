const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET all todos
router.get('/', async (req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

// POST create a todo
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update a todo
router.put('/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });

  await todo.update(req.body);
  res.json(todo);
});

// DELETE a todo
router.delete('/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });

  await todo.destroy();
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
