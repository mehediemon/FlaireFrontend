import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:5000/register', { username, email, password });
            alert('Registration successful!');
            navigate('/');
        } catch (error) {
            alert('Registration failed: ' + error.response?.data?.message);
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, margin: 'auto', marginTop: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Register
            </Typography>
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    fullWidth
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                    variant="outlined"
                />
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
                    onClick={handleRegister}
                    sx={{ marginTop: 2 }}
                >
                    Register Click
                </Button>
                <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                    Already have an account?{' '}
                    <Button color="primary" onClick={() => navigate('/')}>
                        Login go
                    </Button>
                </Typography>
            </Box>
        </Paper>
    );
};

export default Register;
