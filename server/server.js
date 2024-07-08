const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection string
const dbURI = 'mongodb+srv://vineshkannaabalaji2022:czd8vwDRrHk9iHb@cluster0.4bgj52d.mongodb.net/Cluster0?retryWrites=true&w=majority';

// Connecting to MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const todoSchema = new mongoose.Schema({
  task: String,
  completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving todos', error: err });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const newTodo = new Todo({
      task: req.body.task,
      completed: false,
    });
    await newTodo.save();
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ message: 'Error creating todo', error: err });
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    todo.completed = req.body.completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Error updating todo', error: err });
  }
});

app.patch('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    todo.task = req.body.task;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Error updating todo', error: err });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting todo', error: err });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
