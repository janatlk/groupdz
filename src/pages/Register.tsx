import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import api from '../axiosApi.ts';
import { useNavigate } from 'react-router';
import { IAuth } from '../types.ts';

export const SignUp = () => {
  const nav = useNavigate();

  const [form, setForm] = useState({
    user: '',
    pass: '',
    confirm: '',
  });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submitRegistration = async () => {
    setBusy(true);
    setMessage('');
    if (form.pass !== form.confirm) {
      setMessage('Password mismatch.');
      setBusy(false);
      return;
    }

    try {
      const payload: IAuth = {
        username: form.user,
        password: form.pass,
        password_confirm: form.confirm,
      };
      await api.post('/users/', payload);
      nav('/login');
    } catch (err) {
      console.error(err);
      setMessage('Could not register. Username might be taken.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ padding: 4, marginTop: 10, borderRadius: 2 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Create Account
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            submitRegistration();
          }}
        >
          <TextField
            label="Login"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            value={form.user}
            onChange={(e) => updateField('user', e.target.value)}
          />
          <TextField
            label="Secret"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            type="password"
            value={form.pass}
            onChange={(e) => updateField('pass', e.target.value)}
          />
          <TextField
            label="Confirm Secret"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            type="password"
            value={form.confirm}
            onChange={(e) => updateField('confirm', e.target.value)}
          />
          {message && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {message}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, borderRadius: 2 }}
            disabled={busy}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
