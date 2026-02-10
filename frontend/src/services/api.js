import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor for token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProducts = () => API.get('products/');
export const getProductBySlug = (slug) => API.get(`products/${slug}/`);

// ... existing code (getProducts, getProductBySlug, interceptor, etc.) ...

export const getCart = async () => {
  try {
    const response = await API.get('cart/my_cart/');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;  // let the component handle the error
  }
};

// Optional: we'll add update/remove later in same file


export const updateCartItemQuantity = async (itemId, quantity) => {
  try {
    const response =  API.patch(`cart/item-update/${itemId}/`, { quantity: Number(quantity) });
    return response.data;
  } catch (error) {
    console.error('Update quantity failed:', error);
    throw error;
  }
};

export const removeCartItem = async (itemId) => {
  try {
    await API.delete(`cart/item-delete/${itemId}/`);
    // no data returned on DELETE → just success
  } catch (error) {
    console.error('Remove item failed:', error);
    throw error;
  }
};




export default API;