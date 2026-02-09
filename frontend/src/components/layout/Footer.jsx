import { useState } from 'react'
import { Box, Grid, Typography, Container, useMediaQuery } from '@mui/material'
import image from '../../things/GameWar_-_Video_Game_Store_Password_demo_001.jpg'

const footerData = [
    {
        heading: 'Store information',
        items: [
            'Gamewar - Video Game Store\n507-Union Trade Ipsum Doler\nCentre France',
            'demo@blocks.com',
            '(+91) 9876-543-210',
        ],
    },
    {
        heading: 'Quick Links',
        items: ['Search', 'Delivery information', 'About us', 'Privacy Policy', 'Shipping'],
    },
    {
        heading: 'Information',
        items: ['Privacy Policy', 'Store Policy', 'Refund Policy', 'Shipping policy', 'Policy for Buyers'],
    },
    {
        heading: 'More Links',
        items: ['Search', 'Delivery information', 'About us', 'Privacy Policy', 'Shipping'],
    },
]

const Footer = () => {
    const isMobile = useMediaQuery('(max-width:900px)')
    const [openIndex, setOpenIndex] = useState(null)

    const toggleOpen = (index) => {
        if (openIndex === index) setOpenIndex(null)
        else setOpenIndex(index)
    }

    return (
        <Box
            sx={{
                backgroundImage: `url(${image})`,
                backgroundColor: 'black',
                color: '#b0b0b0',
                py: { xs: 7, md: 15, lg: 15 },
                mt: 10,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Container maxWidth={false} sx={{ maxWidth: { xs: '100%', md: '90%', lg: '75%' } }}>
                <Grid container spacing={4} justifyContent={'center'}>
                    {footerData.map((section, index) => (
                        <Grid item size = {{ xs : 12, lg : 3 , md : 3}} key={index}>
                            <Typography
                                variant="h5"
                                fontWeight={'bold'}
                                color={'white'}
                                gutterBottom
                                sx={{
                                    cursor: isMobile ? 'pointer' : 'default',
                                }}
                                onClick={() => isMobile && toggleOpen(index)}
                            >
                                {section.heading}
                            </Typography>

                            {(isMobile ? openIndex === index : true) && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        mt: 3,
                                        transition: 'all 0.3s ease-in-out'
                                    }}
                                >
                                    {section.items.map((item, i) => (
                                        <Typography
                                            key={i}
                                            variant="body2"
                                            sx={{
                                                display: 'inline-block',
                                                whiteSpace: 'pre-line',
                                                '&:hover': {
                                                    color: '#FF7831',
                                                    transition: 'color 0.2s ease-in-out',
                                                },
                                            }}
                                        >
                                            {item}
                                        </Typography>
                                    ))}
                                </Box>
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}

export default Footer
