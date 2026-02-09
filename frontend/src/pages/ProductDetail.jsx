import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API, { getProductBySlug } from '../services/api';
import {
    Container, Typography, Grid, CardMedia, Box, Button,
    Divider, Chip, CircularProgress, Stack
} from '@mui/material';

function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductBySlug(slug);
                setProduct(response.data);
                setSelectedImage(response.data.image || (response.data.images[0]?.image || null));
                setLoading(false);
            } catch (err) {
                setError('Product not found or failed to load.');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    if (loading) return <CircularProgress sx={{ mt: 10, display: 'block', mx: 'auto' }} />;
    if (error || !product) return <Typography color="error" align="center">{error || 'Product not found'}</Typography>;

    const handleAddToCart = async () => {
        try {
            await API.post('cart/add_item/', {
                product_id: product.id,
                quantity: quantity
            });
            alert('Added to cart!');
        } catch (err) {
            alert('Failed to add to cart. ' + (err.response?.data?.detail || 'Please try again.'));
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
            <Grid container spacing={6}>
                {/* Left: Image gallery */}
                <Grid item size = {{ xs: 12, md: 6 }}>
                    {selectedImage ? (
                        <CardMedia
                            component="img"
                            image={selectedImage}
                            alt={product.name}
                            sx={{ borderRadius: 3, boxShadow: 3, width: '100%', height: 'auto', objectFit: 'contain' }}
                        />
                    ) : (
                        <Box sx={{ bgcolor: 'grey.200', height: 400, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="h6" color="text.secondary">No image available</Typography>
                        </Box>
                    )}

                    {/* Thumbnails */}
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        {product.image && (
                            <CardMedia
                                component="img"
                                image={product.image}
                                alt={product.name}
                                onClick={() => setSelectedImage(product.image)}
                                sx={{
                                    width: 60, height: 60, objectFit: 'cover', borderRadius: 1,
                                    border: selectedImage === product.image ? '2px solid blue' : '1px solid grey',
                                    cursor: 'pointer'
                                }}
                            />
                        )}
                        {product.images.map(img => (
                            <CardMedia
                                key={img.id}
                                component="img"
                                image={img.image}
                                alt={img.alt_text || product.name}
                                onClick={() => setSelectedImage(img.image)}
                                sx={{
                                    width: 60, height: 60, objectFit: 'cover', borderRadius: 1,
                                    border: selectedImage === img.image ? '2px solid blue' : '1px solid grey',
                                    cursor: 'pointer'
                                }}
                            />
                        ))}
                    </Stack>
                </Grid>

                {/* Right: Details */}
                <Grid item size = {{ xs: 12, md: 6 }}>
                    <Typography variant="h4" component="h1" gutterBottom>{product.name}</Typography>

                    <Chip label={product.category?.name || 'Uncategorized'} color="primary" variant="outlined" sx={{ mb: 2 }} />

                    {/* Price / Discount */}
                    {product.discount_price ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Typography variant="h5" color="primary">${product.discount_price}</Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ textDecoration: 'line-through' }}>${product.price}</Typography>
                        </Box>
                    ) : (
                        <Typography variant="h5" color="primary" gutterBottom>${product.price}</Typography>
                    )}

                    {/* Color and Size */}
                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        {product.color && <Chip label={`Color: ${product.color}`} />}
                        {product.size && <Chip label={`Size: ${product.size}`} />}
                    </Stack>

                    <Typography variant="body1" color="text.secondary" paragraph sx={{ mt: 1 }}>
                        {product.description || 'No description available.'}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Typography variant="subtitle1">Availability:</Typography>
                        <Chip label={product.available ? 'In Stock' : 'Out of Stock'} color={product.available ? 'success' : 'error'} />
                        {product.stock > 0 && <Typography variant="body2" color="text.secondary">({product.stock} left)</Typography>}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Typography variant="subtitle1">Quantity:</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'grey.400', borderRadius: 1 }}>
                            <Button size="small" onClick={() => setQuantity(prev => Math.max(1, prev - 1))} disabled={quantity <= 1}>-</Button>
                            <Typography sx={{ px: 3, py: 1 }}>{quantity}</Typography>
                            <Button size="small" onClick={() => setQuantity(prev => prev + 1)} disabled={quantity >= product.stock}>+</Button>
                        </Box>
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        disabled={!product.available || product.stock === 0 || quantity > product.stock}
                        onClick={handleAddToCart}
                        sx={{ py: 1.8, fontSize: '1.1rem' }}
                    >
                        Add to Cart
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ProductDetail;
