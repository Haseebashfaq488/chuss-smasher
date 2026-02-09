import { Button, styled } from '@mui/material';

const AnimatedButton = styled(Button)({
  color: 'black',
  backgroundColor: 'white',
  transition: 'transform 0.2s ease, background-color 0.2s ease',
  textTransform: 'none',

  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: '#FF7A21',
    color: 'white',
  },
});

export default AnimatedButton;
