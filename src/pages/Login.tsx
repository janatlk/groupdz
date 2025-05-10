import { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Paper, Alert } from '@mui/material';
import axiosApi from '../axiosApi';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { IAuth } from '../types';

export const Login = () => {
  const { setTokens, setUser } = useAuthStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const requestData: IAuth = { username, password };
      const { data } = await axiosApi.post('/token/', requestData);
      console.log('Login response:', data);
      setTokens(data.access, data.refresh);
      setUser(username, data.user_id || 1);
      console.log('localStorage after login:', {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
      });
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err.response?.status, err.response?.data);
      setError('Login failed! Try again');
    } finally {
      setLoading(false);
    }
  };

  return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
            />
            <TextField
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ mt: 3, borderRadius: 2 }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
  );
};