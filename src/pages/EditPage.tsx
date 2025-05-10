import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    CircularProgress,
    SelectChangeEvent,
} from '@mui/material';
import axiosApi from '../axiosApi';

interface Post {
    id: number;
    title: string;
    content: string;
    categoryId?: number;
    createdAt?: string;
}

interface Category {
    id: number;
    name: string;
}

const EditPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        categoryId: '' as number | '',
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                console.log('No post ID');
                setError('Post ID is missing');
                return;
            }
            try {
                setIsLoading(true);
                setError(null);
                console.log('Fetching post ID:', id);
                const postResponse = await axiosApi.get<Post>(`/posts/${id}`);
                console.log('Post data:', postResponse.data);
                setPost(postResponse.data);
                setFormData({
                    title: postResponse.data.title,
                    content: postResponse.data.content,
                    categoryId: postResponse.data.categoryId ?? '',
                });
                console.log('Fetching categories');
                const categoriesResponse = await axiosApi.get<Category[]>('/categories');
                setCategories(categoriesResponse.data);
            } catch (err: any) {
                console.error('Fetch error:', err.response?.status, err.response?.data);
                setError(err.response?.data?.message || JSON.stringify(err.response?.data) || 'Failed to load data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent<number | string>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id || !formData.title.trim() || !formData.content.trim()) {
            setError('Title and content are required');
            return;
        }
        try {
            setIsLoading(true);
            setError(null);
            const payload = {
                title: formData.title,
                content: formData.content,
                category_id: formData.categoryId === '' ? null : Number(formData.categoryId),
            };
            console.log('Submitting:', JSON.stringify(payload, null, 2));
            await axiosApi.put(`/posts/${id}`, payload);
            console.log('Post updated');
            navigate(`/posts/${id}`, { replace: true });
        } catch (err: any) {
            console.error('Update error:', err.response?.status, err.response?.data);
            const errorMessage = err.response?.data?.message ||
                err.response?.data?.category_id?.[0] ||
                JSON.stringify(err.response?.data) ||
                'Failed to update post';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography color="error" variant="h6">
                    Error: {error}
                </Typography>
            </Container>
        );
    }

    if (!post) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h6">Post not found</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Edit Post
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleTextChange}
                            fullWidth
                            required
                            error={!!error && !formData.title.trim()}
                            helperText={!!error && !formData.title.trim() ? 'Title is required' : ''}
                        />
                        <TextField
                            label="Content"
                            name="content"
                            value={formData.content}
                            onChange={handleTextChange}
                            fullWidth
                            required
                            multiline
                            rows={4}
                            error={!!error && !formData.content.trim()}
                            helperText={!!error && !formData.content.trim() ? 'Content is required' : ''}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleSelectChange}
                                label="Category"
                            >
                                <MenuItem value="">No Category</MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isLoading}
                            >
                                Save Changes
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => navigate(`/posts/${id}`)}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default EditPost;