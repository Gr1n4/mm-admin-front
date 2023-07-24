/* eslint-disable react/jsx-props-no-spreading */
import { FC, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logoutAuthAction } from '@/features/auth/auth.actions';
import { getUserSelector, isLogedinSelector } from '@/features/auth/auth.selectors';
import { Box, Container, Link, styled, Typography } from '@mui/material';
import { UserRole } from '@/types';

const Root = styled('header')(({ theme }) => {
  return {
    backgroundColor: theme.palette.primary.light,
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
          <Link sx={{ marginRight: '2rem' }} href="/">
            <Typography variant="h3">Minecraft Mod Admin Panel</Typography>
          </Link>
          <Link href="/mod">
            <Typography variant="body1">Моды</Typography>
          </Link>
          {isLogedin ? (
            <Fragment>
              <Link href="/user/doctors">
                <Typography variant="body1">Доктора</Typography>
              </Link>
              {user?.role === UserRole.ADMIN ? (
                <Link href="/admin">
                  <Typography variant="body1">Админ</Typography>
                </Link>
              ) : user?.role === UserRole.DOCTOR ? (
                <Link href="/visit">
                  <Typography variant="body1">Прием</Typography>
                </Link>
              ) : null}
            </Fragment>
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
