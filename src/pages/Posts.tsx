import {useAuthStore} from '../store/useAuthStore.ts';
import {usePostsStore} from "../store/usePostStore.ts";
import { useEffect } from "react";
import {
    Container,
    Box,
    Typography,
    Card,
    CardContent
} from '@mui/material';
import {Link} from "react-router";


export const Posts = () => {
    const { posts, getAllPosts } = usePostsStore()
    const store = useAuthStore()

    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    console.log('store', store)
    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                All Posts
            </Typography>
            {posts.length === 0 ? (
                <Typography variant="body1">No posts available</Typography>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {posts.map((post) => (
                        <Card key={post.id} sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    component={Link}
                                    to={`/posts/${post.id}`}
                                    sx={{ textDecoration: 'none', color: 'primary.main' }}
                                    gutterBottom
                                >
                                    {post.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {post.content}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {post.extraInfo}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Container>
    );
};

