import React from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { teal, pink } from '@mui/material/colors';

const TodoList = ({ todos, deleteTodo }) => {
    return (
        <List>
            {todos.map((todo) => (
                <ListItem
                    key={todo.id}
                    sx={{
                        backgroundColor: teal[50],  // Soft teal background
                        marginBottom: "10px",
                        borderRadius: "10px",
                        boxShadow: 1,
                        padding: "10px",
                    }}
                    secondaryAction={
                        <IconButton edge="end" onClick={() => deleteTodo(todo.id)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    }
                >
                    <ListItemText primary={todo.task} sx={{ fontWeight: "bold", color: pink[800] }} />
                </ListItem>
            ))}
        </List>
    );
};

export default TodoList;
