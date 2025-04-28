import { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';
import axiosApi from '../axiosApi.ts';
import { useNavigate } from 'react-router';

export const CreatePost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      if (!title || !content ) {
        setError('Please fill in all required fields.');
        return;
      }

      const requestData = {
        title,
        content,
        category_id: 1,
        // TODO: Заменить на реальную категорию из бекэнда!
        extra_info: extraInfo || null,
      };

      await axiosApi.post('/posts/', requestData);

      navigate('/');
    } catch (error) {
      setError('Failed to create post. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>Create Post</Typography>

        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Content"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Extra Info"
            variant="outlined"
            margin="normal"
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />

          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>{error}</Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 3, borderRadius: 2 }}
          >
            Create Post
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

