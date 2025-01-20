import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// Other imports

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const fetchTasks = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5001/tasks', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(response.data);
        } catch (error) {
            alert('Error fetching tasks');
        }
    }, [token]); // Include `token` as a dependency

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]); // Include `fetchTasks` in the dependency array

    const addTask = async () => {
        try {
            await axios.post('http://localhost:5001/tasks', { title, description }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTitle('');
            setDescription('');
            fetchTasks();
        } catch (error) {
            alert('Error adding task');
        }
    };

    const completeTask = async (id) => {
        try {
            await axios.put(`http://localhost:5001/tasks/${id}/complete`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTasks();
        } catch (error) {
            alert('Error completing task');
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTasks();
        } catch (error) {
            alert('Error deleting task');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Task Manager
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" sx={{ marginTop: 4 }}>
                <Paper elevation={3} sx={{ padding: 4 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Task List
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                        <TextField
                            fullWidth
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            variant="outlined"
                        />
                        <Button variant="contained" color="primary" onClick={addTask}>
                            Add Task
                        </Button>
                    </Box>
                    <List>
                        {tasks.map((task) => (
                            <ListItem
                                key={task.id}
                                secondaryAction={
                                    <>
                                        <IconButton onClick={() => completeTask(task.id)}>
                                            <CheckCircleIcon color={task.completed ? 'success' : 'action'} />
                                        </IconButton>
                                        <IconButton onClick={() => deleteTask(task.id)}>
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </>
                                }
                            >
                                <ListItemText
                                    primary={`${task.title} ${task.completed ? '(Completed)' : ''}`}
                                    secondary={task.description}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Container>
        </Box>
    );
};

export default TaskManager;
