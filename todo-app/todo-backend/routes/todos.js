const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.deleteOne()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.json(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  // res.sendStatus(405); // Implement this
  // const { id } = req.params
  try {
    if (req.body.text) {
      req.todo.text = req.body.text
    }
    if (req.body.done) {
      req.todo.done = req.body.done
    }
    const updatedTodo = await req.todo.save();
    res.json(updatedTodo);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
