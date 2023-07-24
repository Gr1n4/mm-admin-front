import { Box, CircularProgress, Typography } from '@mui/material';
import { FC, ReactElement, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthRole } from '../../auth.hooks';
import { UserRole } from '@/types';

export const PatientRoute: FC<{ redirect: boolean; element: ReactNode; role: UserRole }> = ({
  redirect,
  element,
  role,
}) => {
  const { isLoading, accept } = useAuthRole(role);
  if (isLoading) {
    return (
      <Box sx={{ width: '100%', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }
  // if (!accept) {
  //   return redirect ? <Navigate to="/auth" /> : <Typography variant="h1">Not Found page</Typography>;
  // }
  return element as ReactElement;
};
