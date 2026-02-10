import { useState, useEffect } from 'react';
import {
    Container, Typography, Box, Button, Divider, CircularProgress,
    Card, CardContent, CardActions, IconButton, Grid, Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { getCart, updateCartItemQuantity, removeCartItem } from '../services/api';

function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState({}); // per item loading

    const loadCart = async () => {
        setLoading(true);
        try {
            const data = await getCart();
            setCart(data);
            setError(null);
        } catch (err) {
            setError('Could not load cart. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const handleQuantityChange = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        console.log(`Trying to update item ${itemId} to quantity ${newQuantity}`);

        setActionLoading(prev => ({ ...prev, [itemId]: true }));

        try {
            const res = await updateCartItemQuantity(itemId, newQuantity);
            console.log('Update success:', res);
            await loadCart();
        } catch (err) {
            console.error('Update failed:', err.response?.data || err.message);
            setError('Failed to update quantity: ' + (err.response?.data?.detail || 'Unknown error'));
        } finally {
            setActionLoading(prev => ({ ...prev, [itemId]: false }));
        }
    };

    const handleRemoveItem = async (itemId) => {
        setActionLoading(prev => ({ ...prev, [itemId]: true }));

        try {
            await removeCartItem(itemId);
            await loadCart(); // refresh
        } catch (err) {
            setError('Failed to remove item. Please try again.');
        } finally {
            setActionLoading(prev => ({ ...prev, [itemId]: false }));
        }
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Container maxWidth="lg" sx={{ mt: 6 }}><Alert severity="error">{error}</Alert></Container>;
    }

    if (!cart || cart.items.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
                <Typography variant="h4" gutterBottom>Your Shopping Cart</Typography>
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>Your cart is empty</Typography>
                    <Button variant="contained" href="/shop" sx={{ mt: 2 }}>Continue Shopping</Button>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
            <Typography variant="h4" gutterBottom>Your Shopping Cart</Typography>

            {cart.items.map((item) => (
                <Card key={item.id} sx={{ mb: 3, boxShadow: 2 }}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                            {/* Product name & price */}
                            <Grid item xs={7}>
                                <Typography variant="h6">{item.product.name}</Typography>
                                <Typography color="text.secondary" variant="body2">
                                    Unit price: ${Number(item.product.price).toFixed(2)}
                                </Typography>
                            </Grid>

                            {/* Subtotal */}
                            <Grid item xs={3} textAlign="right">
                                <Typography variant="h6" color="primary">
                                    ${item.subtotal.toFixed(2)}
                                </Typography>
                            </Grid>

                            {/* Actions */}
                            <Grid item xs={2} textAlign="right">
                                <IconButton
                                    color="error"
                                    onClick={() => handleRemoveItem(item.id)}
                                    disabled={actionLoading[item.id]}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>

                        {/* Quantity controls */}
                        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="body1">Quantity:</Typography>

                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid',
                                borderColor: 'grey.400',
                                borderRadius: 1,
                                bgcolor: 'background.paper'
                            }}>
                                <IconButton
                                    size="small"
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1 || actionLoading[item.id]}
                                >
                                    <RemoveIcon fontSize="small" />
                                </IconButton>

                                <Typography sx={{ px: 3, fontWeight: 'medium' }}>
                                    {item.quantity}
                                </Typography>

                                <IconButton
                                    size="small"
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    disabled={actionLoading[item.id]}
                                >
                                    <AddIcon fontSize="small" />
                                </IconButton>
                            </Box>

                            {actionLoading[item.id] && <CircularProgress size={20} sx={{ ml: 2 }} />}
                        </Box>
                    </CardContent>
                </Card>
            ))}

            <Divider sx={{ my: 4 }} />

            <Box sx={{ textAlign: 'right', pr: 2 }}>
                <Typography variant="h6">
                    Total Items: {cart.total_items}
                </Typography>
                <Typography variant="h5" color="primary" fontWeight="bold">
                    Total: ${cart.total_price.toFixed(2)}
                </Typography>
            </Box>

            <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ mt: 4, py: 1.8, fontSize: '1.1rem' }}
                disabled={cart.items.length === 0}
            >
                Proceed to Checkout
            </Button>
        </Container>
    );
}

export default Cart;