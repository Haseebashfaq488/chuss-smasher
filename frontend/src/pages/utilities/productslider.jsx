import { useState, useEffect } from 'react'
import { getProducts } from '../../services/api'
import { Link as RouterLink } from 'react-router-dom'

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  CircularProgress
} from '@mui/material'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined'

import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const iconContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
}

const iconItem = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 }
}

const ProductSlider = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts()
        setProducts(res.data)
      } catch {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) return <CircularProgress />
  if (error) return <Typography color="error">{error}</Typography>

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {products.map(product => (
          <Grid item size = {{xs : 12 , md : 4 , lg : 4 }}  key={product.id}>
            <Card sx={{ height: '100%', overflow: 'hidden' , boxShadow: 3, borderRadius: 4 }}>
              <MotionBox
                initial="hidden"
                whileHover="visible"
                sx={{ position: 'relative', overflow: 'hidden' }}
              >
                <RouterLink to={`/product/${product.slug}`}>
                  <CardMedia
                    component="img"
                    height="260"
                    image={product.image || 'https://picsum.photos/400/400'}
                    alt={product.name}
                    sx={{ objectFit: 'cover', borderRadius: 4, '&:hover': { transform: 'scale(1.05)' , transition: 'transform 0.3s ease-in-out' , borderRadius : 4  } }}
                  />
                </RouterLink>

                <MotionBox
                  variants={iconContainer}
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                  }}
                >
                  {[FavoriteBorderIcon, VisibilityOutlinedIcon, ShoppingCartOutlinedIcon, CompareArrowsOutlinedIcon].map(
                    (Icon, i) => (
                      <MotionBox key={i} variants={iconItem}>
                        <IconButton
                          sx={{
                            backgroundColor: 'black',
                            '&:hover': {
                              backgroundColor: '#FF7A21',
                              color: 'black'
                            }
                          }}
                        >
                          <Icon />
                        </IconButton>
                      </MotionBox>
                    )
                  )}
                </MotionBox>
              </MotionBox>

              <CardContent>
                <Typography variant="h6" noWrap>
                  {product.name}
                </Typography>
                <Typography color="text.secondary">
                  ${Number(product.price).toFixed(2)}
                </Typography>
              </CardContent>

              <CardActions>
                {product.free_shipping && (
                  <Typography variant="body2" color="success.main">
                    Free Shipping
                  </Typography>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ProductSlider
