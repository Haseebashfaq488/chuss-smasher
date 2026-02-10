import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logo from '../../things/logo.png'
import AnimatedButton from '../../pages/utilities/animatedbutton'

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()
  const isLoggedIn = !!localStorage.getItem('accessToken')

  const logout = () => {
    localStorage.removeItem('accessToken')
    navigate('/')
    window.location.reload()
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ backgroundColor: '#1A1A1A', p: 2, display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box component="img" src={logo} alt="logo" sx={{ height: 40 }} />

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 4 }}>
          {['Home', 'About', 'Shop', 'ContactUs'].map((text, index) => (
            <Button
              key={index}
              component={RouterLink}
              to={text === 'Home' ? '/' : `/${text.toLowerCase()}`}
              variant="text"
              sx={{
                color: '#fff',
                position: 'relative',
                fontWeight: 500,
                fontSize: '16px',
                textTransform: 'none',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  width: 0,
                  height: '3px',
                  bgcolor: '#FF7A21',
                  transition: 'width 0.3s ease',
                },
                '&:hover::after': {
                  width: '100%',
                },
                '&:hover': {
                  color: '#FF7A21',
                },
              }}
            >
              {text}
            </Button>
          ))}
        </Box>


          

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>

          {!isLoggedIn && (
            <>
              <AnimatedButton size="small" component={RouterLink} to="/login">Login</AnimatedButton>
              <AnimatedButton size="small" component={RouterLink} to="/register">Register</AnimatedButton>
            </>
          )}

          {isLoggedIn && (
            <>
              <AnimatedButton size="small" component={RouterLink} to="/" onClick={logout}>Logout</AnimatedButton>
              <AnimatedButton size="small" component={RouterLink} to="/cart">Cart</AnimatedButton>
            </>
          )}
        </Box>

        {/* Mobile Drawer Button - visible on xs and sm */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <Button onClick={() => setDrawerOpen(true)} sx={{ color: '#fff' }}>Menu</Button>

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
              sx: {
                width: '50%',
                backgroundColor: '#1A1A1A',
                color: 'white',
                padding: 1,
              },
            }}
          >
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
              <Box component="img" src={logo} alt="logo" sx={{ height: 40 }} />
            </Box>

            <List>
              <ListItem button component={RouterLink} to="/" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="Home" sx={{ color: 'white' }} />
              </ListItem>
              <ListItem button component={RouterLink} to="/about" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="About Us" sx={{ color: 'white' }} />
              </ListItem>
              <ListItem button component={RouterLink} to="/shop" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="Shop" sx={{ color: 'white' }} />
              </ListItem>
              <ListItem button component={RouterLink} to="/contactus" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="Contact Us" sx={{ color: 'white' }} />
              </ListItem>
            </List>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              {!isLoggedIn && (
                <>
                  <AnimatedButton size="small" component={RouterLink} to="/login" sx={{ width: '50%' }} onClick={() => setDrawerOpen(false)}>Login</AnimatedButton>
                  <AnimatedButton size="small" component={RouterLink} to="/register" sx={{ width: '50%' }} onClick={() => setDrawerOpen(false)}>Register</AnimatedButton>
                </>
              )}
              {isLoggedIn && (
                <>
                  <AnimatedButton size="small" component={RouterLink} to="/" sx={{ width: '50%' }} onClick={() => { logout(); setDrawerOpen(false) }}>Logout</AnimatedButton>
                  <AnimatedButton size="small" component={RouterLink} to="/cart" sx={{ width: '50%' }} onClick={() => setDrawerOpen(false)}>Cart</AnimatedButton>
                </>
              )}
            </Box>
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
