/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logoutAuthAction } from '@/features/auth/auth.actions';
import { getUserSelector, isLogedinSelector } from '@/features/auth/auth.selectors';
import { Box, Container, Link, Stack, styled, Typography } from '@mui/material';
import { UserRole } from '@/types';
import { isAccept } from '@/features';

const Root = styled('header')(({ theme }) => {
  console.log('theme: %o', theme);
  return {
    backgroundColor: 'rgb(28, 37, 54);',
    height: '7rem',
    display: 'flex',
    alignItems: 'center',
  };
});

export const Header: FC = () => {
  const dispatch = useDispatch();
  const isLogedin = useSelector(isLogedinSelector);
  const user = useSelector(getUserSelector);
  const handleLogout = () => {
    dispatch(logoutAuthAction.started());
  };

  return (
    <Root>
      <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link sx={{ marginRight: '4rem' }} href="/">
            <Typography variant="h6">MAAP</Typography>
          </Link>
          {isLogedin ? (
            <Stack spacing={4} direction="row">
              {isAccept(user!.role, UserRole.ADMIN) ? (
                <Link href="/user">
                  <Typography variant="body1">Персонал</Typography>
                </Link>
              ) : null}
              <Link href="/mod/mod">
                <Typography variant="body1">Моды</Typography>
              </Link>
            </Stack>
          ) : null}
        </Box>
        <Box>
          {isLogedin ? (
            <Typography css={{ cursor: 'pointer' }} variant="body1" onClick={handleLogout}>
              Выйти
            </Typography>
          ) : null}
        </Box>
      </Container>
    </Root>
  );
};
