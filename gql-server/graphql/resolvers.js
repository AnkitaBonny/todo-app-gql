const Todo = require("../models/todo");

module.exports = {
  todos: async () => {
    const todos = await Todo.find();

    return todos.map(({ _id, summary, created_at, last_updated}) => ({
      id: _id.toString(),
      summary,
      created_at,
      last_updated
    }));
  },
  addTodo: async ({ summary }) => {
    const todo = new Todo({
      summary
    });
    const insertedTodo = await todo.save();
    const { _doc, _id } = insertedTodo;

    return {
      ..._doc,
      id: _id.toString()
    };
  },
  updateTodo: async ({ id, summary }) => {
    const todo = await Todo.findById(id);

    if (!todo) {
      throw new Error("Todo not found !!");
    }

    todo.summary = summary;
    todo.last_updated = Date.now();
    
    const updatedTodo = await todo.save();
    const { _doc, _id } = updatedTodo;

    return {
      ..._doc,
      id: _id.toString()
    };
  },
  deleteTodo: async ({ id }) => {
    const todo = await Todo.findById(id);

    if (!todo) {
      throw new Error("Todo not found !!");
    }
    
    await Todo.findByIdAndRemove(id);
    const { _doc, _id } = todo;

    return {
      ..._doc,
      id: _id.toString()
    };
  }
};
