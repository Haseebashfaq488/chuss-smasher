import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, Container } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AnimatedButton from './animatedbutton';
import { Link } from 'react-router-dom';

const slides = [
  {
    title: "GAME GUIDE UNOFFICIAL",
    subtitle: "Star Wars Up Coming",
    img: "/path/to/your/image1.jpg",
    btnText: "Shop Now",
    btnLink: "/shop",
  },
  {
    title: "ANOTHER GAME TITLE",
    subtitle: "Coming Soon",
    img: "/path/to/your/image2.jpg",
    btnText: "Learn More",
    btnLink: "/shop",
  },
];

export default function HeroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Box sx={{  mt: 0 }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              height: '100vh', // full viewport height
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundImage: `url(${slide.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
            />
            {/* Content */}
            <Container maxWidth={false}
              sx={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                {slide.subtitle}
              </Typography>
              <Typography variant="h3" sx={{ mb: 3, fontWeight: 'bold' }}>
                {slide.title}
              </Typography>
              <AnimatedButton
                component={Link}
                to={slide.btnLink}
                size="large"
              >
                {slide.btnText}
              </AnimatedButton>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
