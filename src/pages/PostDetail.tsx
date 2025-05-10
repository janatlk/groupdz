import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
    Container,
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    CircularProgress,
} from '@mui/material';
import axiosApi from '../axiosApi';

interface Post {
    id: number;
    title: string;
    content: string;
    categoryId: number;
    createdAt: string;
    categoryName?: string;
}

const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const isAuthenticated = !!localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;
            try {
                setIsLoading(true);
                setError(null);
                const response = await axiosApi.get<Post>(`/posts/${id}`);
                setPost(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch post');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        if (!id || !window.confirm('Are you sure you want to delete this post?')) return;
        try {
            await axiosApi.delete(`/posts/${id}`);
            navigate('/posts', { replace: true });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete post');
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
                        {post.title}
                    </Typography>
                    <Typography variant="h2" component="h4" gutterBottom>
                        {post.categoryName}
                    </Typography>
                    {post.categoryName && (
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            Category: {post.categoryName}
                        </Typography>
                    )}
                    <Typography variant="body1" color="text.secondary">
                        {post.content}
                    </Typography>
                    {post.createdAt && (
                        <Typography variant="caption" color="text.secondary">
                            Posted on: {new Date(post.createdAt).toLocaleDateString()}
                        </Typography>
                    )}
                </CardContent>
                {isAuthenticated && (
                    <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
                        <Button variant="contained" color="error" onClick={handleDelete}>
                            Delete Post
                        </Button>
                        <Button variant="outlined" color="primary" onClick={() => navigate(`/edit-page/${id}`)}>
                            Edit Post
                        </Button>
                    </Box>
                )}
            </Card>
        </Container>
    );
};

export default PostDetail;