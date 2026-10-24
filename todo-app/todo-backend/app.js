const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const redisClient = require('./redis')

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/todos', todosRouter);
app.get('/statistics', async (req, res) => {
  try {
    const added_todos = await redisClient.get('added_todos')
    res.json({ "added_todos": Number(added_todos) || 0})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

module.exports = app;
