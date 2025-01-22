import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/tasks');
        } catch (error) {
            alert('Login failed: ' + error.response?.data?.message);
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, margin: 'auto', marginTop: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    variant="outlined"
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    sx={{ marginTop: 2 }}
                >
                    Login
                </Button>
                <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                    Don't have an account?{' '}
                    <Button color="primary" onClick={() => navigate('/register')}>
                        Register here
                    </Button>
                </Typography>
            </Box>
        </Paper>
    );
};

export default Login;
