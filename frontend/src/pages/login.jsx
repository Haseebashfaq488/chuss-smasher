import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, TextField, Button, Box, Alert, CircularProgress 
} from '@mui/material';
import API from '../services/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await API.post('token/', { username, password });
      localStorage.setItem('accessToken', response.data.access);
      // Optional: store refreshToken if you want auto-refresh later
      // localStorage.setItem('refreshToken', response.data.refresh);
      
      alert('Login successful!');
      navigate('/shop');  // redirect to shop after login
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid credentials. Try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <Button 
          type="submit" 
          variant="contained" 
          size="large" 
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </Box>

      <Typography align="center" sx={{ mt: 2 }}>
        Don't have an account? <Button component="a" href="/register">Register here</Button>
      </Typography>
    </Container>
  );
}

export default Login;