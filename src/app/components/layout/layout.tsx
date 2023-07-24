import { Box } from '@mui/material';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../footer';
import { Header } from '../header';

export const Layout: FC<unknown> = () => {

  return (
    <Box flexDirection="column" css={{ position: 'relative' }}>
      <Header />
      <Box css={{ minHeight: 'calc(100vh - 17rem)' }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};
