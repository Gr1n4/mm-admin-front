import { Box, Container, styled, Typography } from '@mui/material';
import { FC } from 'react';

const Root = styled('footer')(({ theme }) => {
  return {
    backgroundColor: theme.palette.common.black,
    height: '10rem',
    display: 'flex',
    alignItems: 'center',
  };
});

export const Footer: FC = () => {
  return (
    <Root>
      <Container sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Box>
          <Typography color="white">email</Typography>
          <Typography color="white">phone</Typography>
        </Box>
      </Container>
    </Root>
  );
};
