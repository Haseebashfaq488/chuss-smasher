
import { Typography, Box, Grid, Container,Card, CardMedia,CardActions,CardContent,CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';
import HeroSlider from './utilities/slider';
import FeatureCard from './utilities/FeatureCard';
import image1 from '../things/GameWar_-_Video_Game_Store_Password_demo_004.png';
import image2 from '../things/GameWar_-_Video_Game_Store_Password_demo_005.png';
import image3 from '../things/GameWar_-_Video_Game_Store_Password_demo_001.png';
import image4 from '../things/GameWar_-_Video_Game_Store_Password_demo_002.png';
import image5 from '../things/GameWar_-_Video_Game_Store_Password_demo_003.png';
import ProductSlider from './utilities/productslider';
import AnimatedButton from './utilities/animatedbutton';
import { useState, useEffect } from 'react';


const features = [
    {
        icon: 'https://cdn-icons-png.flaticon.com/512/891/891462.png',
        title: 'Free Delivery',
        description: 'Free shipping on all orders.',
    },
    {
        icon: 'https://cdn-icons-png.flaticon.com/512/891/891467.png',
        title: 'Free Returns',
        description: 'Easy returns within 30 days.',
    },
    {
        icon: 'https://cdn-icons-png.flaticon.com/512/891/891468.png',
        title: 'Secure Payment',
        description: '100% secure payment processing.',
    },
    {
        icon: 'https://cdn-icons-png.flaticon.com/512/891/891469.png',
        title: '24/7 Support',
        description: 'We are here to help anytime.',
    },
];

const Home = () => {

    return (

        <>
            <HeroSlider />
            <Container maxWidth="False" sx={{ maxWidth: { xs: '100%', md: '90%', lg: '85%' } }} >
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 15, px: 5 }}>
                    {features.map((feature, index) => (
                        <Grid
                            item
                            size={{ xs: 12, sm: 6, md: 3 }}
                            key={index}
                            sx={{
                                borderRight: { xs: 'none', md: index !== features.length - 1 ? '2px solid black' : 'none' },
                                my: { xs: 5, md: 0 },
                                px: { xs: 2, md: 0 },
                            }}
                        >
                            <FeatureCard
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />

                        </Grid>
                    ))}
                </Grid>

            </Container >

            <Container sx={{
                my: 20,
                maxWidth: { xs: '100%', md: '90%', lg: '75%' },
            }}>
                <Grid container spacing={5} sx={{
                    display: 'flex',
                    justifyContent: { xs: 'center', md: 'none', lg: 'none' },
                    alignItems: 'center',
                }}  >
                    <Grid item size={{ xs: 12, md: 6, lg: 6 }}  >
                        <Box sx={{
                            position: 'relative',
                            width: '100%',
                            height: { xs: 400, md: 400 },
                            borderRadius: 5,
                            overflow: 'hidden',
                            display: 'flex',
                            justifyContent: 'flex-end',

                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: `url(${image1})`,
                                backgroundSize: 'cover',
                                backgroundPosition: { xs: 'top', md: 'center' },
                                transition: 'transform 0.5s ease',
                                zIndex: 0,
                            },

                            '&:hover::before': {
                                transform: 'scale(1.05)',
                            },
                        }}
                        >
                            <Box sx={{ my: { xs: 10, md: 10, lg: 10 }, mx: 3, display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '30%' }} >
                                <Typography variant="body1" sx={{ color: 'white', zIndex: 1 }}>
                                    Best Action Game 2024
                                </Typography>
                                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', zIndex: 1 }}>
                                    DEAD RISING ZOMBIES
                                </Typography>
                                <AnimatedButton>
                                    Shop Now
                                </AnimatedButton>
                            </Box>
                        </Box>

                    </Grid>

                    <Grid item size={{ xs: 12, md: 6, lg: 6 }} >
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                height: { xs: 400, md: 400 },
                                borderRadius: 5,
                                overflow: 'hidden',
                                display: 'flex',
                                justifyContent: 'flex-end',

                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundImage: `url(${image2})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: { xs: 'top', md: 'center' },
                                    transition: 'transform 0.5s ease',
                                    zIndex: 0,
                                },

                                '&:hover::before': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <Box sx={{ my: { xs: 10, md: 10, lg: 10 }, mx: 3, display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '30%' }} >
                                <Typography variant="body1" sx={{ color: 'white', zIndex: 1 }}>
                                    Best Action Game 2024
                                </Typography>
                                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', zIndex: 1 }}>
                                    DEAD RISING ZOMBIES
                                </Typography>
                                <AnimatedButton>
                                    Shop Now
                                </AnimatedButton>
                            </Box>
                        </Box>

                    </Grid>

                </Grid>
            </Container >


            <Container sx={{ mb: 20, maxWidth: { xs: '100%', md: '90%', lg: '75%' } }} >
                <Typography variant="h3" sx={{ mb: 5, textAlign: 'center' }}>
                    Special Category
                </Typography>
                <span style={{
                    display: 'block',
                    width: '12%',
                    height: '2px',
                    backgroundColor: '#FF7A21',
                    margin: '0 auto',
                }}></span>

                <Grid container spacing={5} sx={{ mt: 5, display: 'flex', justifyContent: 'center' }} >
                    <Grid item size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }} >
                        <Box sx={{ overflow: 'hidden', borderRadius: 5 }}>
                            <Box
                                component="img"
                                src={image3}
                                alt="Special Category 1"
                                sx={{
                                    width: '100%',
                                    transition: 'transform 0.5s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Action Games
                        </Typography>
                        <AnimatedButton component={Link} to="/shop" >
                            View All
                        </AnimatedButton>
                    </Grid>
                    <Grid item size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }} >
                        <Box sx={{ overflow: 'hidden', borderRadius: 5 }}>
                            <Box
                                component="img"
                                src={image4}
                                alt="Special Category 1"
                                sx={{
                                    width: '100%',
                                    transition: 'transform 0.5s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Action Games
                        </Typography>
                        <AnimatedButton component={Link} to="/shop" >
                            View All
                        </AnimatedButton>
                    </Grid>
                    <Grid item size={{ xs: 12, md: 4, lg: 4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }} >
                        <Box sx={{ overflow: 'hidden', borderRadius: 5 }}>
                            <Box
                                component="img"
                                src={image5}
                                alt="Special Category 1"
                                sx={{
                                    width: '100%',
                                    transition: 'transform 0.5s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Action Games
                        </Typography>
                        <AnimatedButton component={Link} to="/shop" >
                            View All
                        </AnimatedButton>
                    </Grid>
                </Grid>
            </Container>

            <Container>
                <ProductSlider />
            </Container>
        </>
    );
}
export default Home;