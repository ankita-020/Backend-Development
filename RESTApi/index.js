import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 5111;
const TODOS = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
];

app.use(bodyParser.json());

app.all("/", (req, res) => {
  // console.log("Request >", req);
  // console.log("Response >", res);
  res.send("I'm up!");
});

app.get("/todos", (req, res) => {
  res.json(TODOS);
});

app.post("/todos", (req, res) => {
  const newTodo = req.body;
  TODOS.push(newTodo);
  res.status(201).json({
    message: "New Todo Added!",
  });
});

app.put("/todos/:id", (req, res) => {
  const newTodoData = req.body;
  const todoId = Number(req.params.id);

  const todoIndex = TODOS.findIndex((td) => td.id === todoId);

  if (todoIndex !== -1) {
    TODOS[todoIndex] = {
      id: todoId,
      ...newTodoData,
    };
    res.json({
      message: "Todo updated successfully again!",
    });
  } else {
    res.status(400).json({
      message: "Todo Id does not exist",
    });
  }
});

app.delete("/todos/:id", (req, res) => {
  const todoId = req.params.id;
  if (todoId !== -1) {
    TODOS.splice(todoId, 1);
  }
  res.json({
    message: "Todo deleted successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
