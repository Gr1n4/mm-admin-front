import { Box, styled } from '@mui/material';
import { FC, forwardRef, ReactNode } from 'react';

const Root = styled(Box)(() => {
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
});

export const ModalContent = forwardRef(({ children }: { children: ReactNode }, ref) => {
  return <Root ref={ref}>{children}</Root>;
});
