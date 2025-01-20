import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskManager from './components/TaskManager';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                    path="/tasks" 
                    element={
                        <PrivateRoute>
                            <TaskManager />
                        </PrivateRoute>
                    } 
                />
            </Routes>
        </Router>
    );
}

export default App;
