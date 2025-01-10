import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Container, Box, Typography, Card, CardContent } from "@mui/material";
import TodoList from "./components/TodoList";
import { purple, pink, blue, teal } from '@mui/material/colors';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/todos").then((response) => {
            setTodos(response.data);
        });
    }, []);

    const addTodo = () => {
        if (task.trim() === "") return; // Avoid adding empty tasks
        const newTodo = { id: Date.now(), task };
        axios.post("http://localhost:5000/todos", newTodo).then(() => {
            setTodos([...todos, newTodo]);
            setTask("");
        });
    };

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:5000/todos/${id}`).then(() => {
            setTodos(todos.filter((todo) => todo.id !== id));
        });
    };

    return (
        <Container
            maxWidth="sm"
            style={{
                marginTop: "50px",
                background: "linear-gradient(to bottom right, #FFD1DC, #D3E5E8)", // Pastel gradient (pink to blue)
                borderRadius: "15px",
                padding: "30px",
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)"
            }}
        >
            <Typography variant="h4" align="center" gutterBottom sx={{ color: purple[700] }}>
                📃 To-Do List
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center" marginBottom={3}>
                <TextField
                    label="Add a new task"
                    variant="outlined"
                    fullWidth
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    style={{
                        marginRight: "10px",
                        borderColor: blue[500],
                        backgroundColor: "#ffffff",
                        borderRadius: "10px",
                        padding: "10px"
                    }}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={addTodo}
                    style={{
                        height: "100%",
                        borderRadius: "10px",
                        backgroundColor: pink[500],
                        color: "#ffffff",
                        fontWeight: "bold",
                    }}
                >
                    Add
                </Button>
            </Box>
            <Card sx={{ borderRadius: "10px", boxShadow: 3 }}>
                <CardContent sx={{ padding: "20px" }}>
                    <TodoList todos={todos} deleteTodo={deleteTodo} />
                </CardContent>
            </Card>
        </Container>
    );
};

export default App;
