const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const filePath = "./todos.json";

// Read Todos
app.get("/todos", (req, res) => {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        res.json(JSON.parse(data));
    } else {
        res.json([]);
    }
});

// Add Todo
app.post("/todos", (req, res) => {
    const todo = req.body;
    const todos = fs.existsSync(filePath)
        ? JSON.parse(fs.readFileSync(filePath))
        : [];
    todos.push(todo);
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
    res.status(201).json(todo);
});

// Delete Todo
app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todos = fs.existsSync(filePath)
        ? JSON.parse(fs.readFileSync(filePath))
        : [];
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(filteredTodos, null, 2));
    res.json({ message: "Todo deleted" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
