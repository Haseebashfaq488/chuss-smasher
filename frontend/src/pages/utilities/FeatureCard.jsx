import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const IconWrapper = styled(Box)({
  width: 60,
  height: 60,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'transform 0.5s ease, filter 0.5s ease',
  '& img': {
    width: '100%',
    height: '100%',
    transition: 'transform 0.5s ease, filter 0.5s ease',
    filter: 'grayscale(0%)',
  },
  '&:hover img': {
    transform: 'translateY(-10px)',
    filter: 'grayscale(0%) drop-shadow(0 0 0 #FF7A21)',
  },
});

export default function FeatureCard({ icon, title, description }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 2,
      }}
    >
      <IconWrapper>
        <img src={icon} alt={title} />
      </IconWrapper>
      <Box>
        <Typography variant="h7" sx = {{ fontWeight: 'bold' }}>{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Box>
  );
}
