import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'

import Navbar from './components/layout/Navbar'
import Shop from './pages/shop'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/login'
import Register from './pages/register'
import Cart from './pages/cart'
import Home from './pages/home'
import Footer from './components/layout/Footer'
<<<<<<< HEAD
import ContactUs from './pages/contactus'
=======
>>>>>>> 91a85ad487f6df392a530274468c79283bebb085

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1A1A1A',
      paper: '#1A1A1A',
    },
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',

    h1: {
      fontFamily: 'Oxanium, sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Oxanium, sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Oxanium, sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Oxanium, sans-serif',
      fontWeight: 500,
    },
    h5: {
      fontFamily: 'Oxanium, sans-serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: 'Oxanium, sans-serif',
      fontWeight: 500,
    },

    button: {
      fontFamily: 'Oxanium, sans-serif',
      textTransform: 'none',
      fontWeight: 600,
    },

    body1: {
      fontFamily: 'Poppins, sans-serif',
    },
    body2: {
      fontFamily: 'Poppins, sans-serif',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Box sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
<<<<<<< HEAD
            <Route path="/contactus" element = {<ContactUs/>} />
=======
>>>>>>> 91a85ad487f6df392a530274468c79283bebb085
          </Routes>
         
        </Box>
        <Footer />

      </Router>
    </ThemeProvider>
  )
}

export default App
