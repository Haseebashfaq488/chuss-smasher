import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { getProducts } from '../services/api';
import { Link as RouterLink } from 'react-router-dom';
import AnimatedButton from './utilities/animatedbutton';

function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <Typography>Loading products...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 4 }}>
                Shop All Products
            </Typography>

            {products.length === 0 ? (
                <Typography>No products available at the moment.</Typography>
            ) : (
                <Grid container spacing={3} display={'flex'} justifyContent={'center'}>
                    {products.map((product) => (
                       

                            <Grid item size={{ xs: 10, md: 4, lg: 4 }} key={product.id} py={{ xs: 5, md: 0, lg: 0 }}>
                                <>
                                <RouterLink to={`/product/${product.slug}`} style={{ textDecoration: 'none' }} key={product.id}>
                                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #e0e0e0', '&:hover': { boxShadow: 3, borderRadius: 2, transition: 'box-shadow 0.3s ease-in-out' } }}>
                                        {product.image && (
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                sx={{
                                                    border: '1px solid #f0f0f0',
                                                    borderRadius: '4px',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                    padding: '4px',
                                                    '&:hover': {
                                                        transform: 'scale(1.05)',
                                                        transition: 'transform 0.3s ease-in-out'
                                                    }
                                                }}
                                                image={product.image.startsWith('http')
                                                    ? product.image
                                                    : `http://127.0.0.1:8000${product.image}`}
                                                alt={product.name}
                                            />
                                        )}
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography variant="h6" component="div">
                                                {product.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                {product.category?.name || 'Uncategorized'}
                                            </Typography>
                                            <Typography variant="h6" color="primary">
                                                ${product.price}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Stock: {product.stock}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <AnimatedButton size="small" variant="outlined" fullWidth sx = {{ '&:hover': {transform : 'scale(1.00)', transition: 'transform 0.3s ease-in-out'}}}>
                                                View Details
                                            </AnimatedButton>
                                        </CardActions>
                                    </Card>
                                    </RouterLink>
                                    </>
                            </Grid>
            ))}
        </Grid>
    )
}
        </Container >
    );
}

export default Shop;