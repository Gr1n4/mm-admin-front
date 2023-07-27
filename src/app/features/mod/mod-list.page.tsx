import { Box, CircularProgress, Container, Fab, Grid, Link, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { getSingleLoadingSelector } from '@ro-loading';
import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DnDList from 'react-dnd-list';
import { ModCard, ModDndList } from './components';
import { feedModAction, sortedFeedModAction } from './mod.action';
import { getFeedModSelector, getSortedIdsModSelector } from './mod.selector';
import { ModType } from './mod.types';

interface ModListPageProps {
  type: ModType;
}

export const ModListPage: FC<ModListPageProps> = ({ type }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => getSingleLoadingSelector(state, 'feedSortedMod'));
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(sortedFeedModAction.started());
  }, []);

  return (
    <Container sx={{ position: 'relative' }}>
      <Typography sx={{ marginBottom: '2rem' }} variant="h2">
        Список {type}
      </Typography>
      <Stack spacing={4} direction="row">
        <Link href="/mod/mod">
          <Typography variant="body1">Моды</Typography>
        </Link>
        <Link href="/mod/seed">
          <Typography variant="body1">Сиды</Typography>
        </Link>
        <Link href="/mod/skin">
          <Typography variant="body1">Скины</Typography>
        </Link>
        <Link href="/mod/map">
          <Typography variant="body1">Карты</Typography>
        </Link>
      </Stack>
      {isLoading ? (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <ModDndList type={type} />
      )}
      <Fab
        sx={{ position: 'fixed', bottom: '4rem', right: '4rem', zIndex: 2000 }}
        size="large"
        color="primary"
        onClick={() => navigate('/mod/create')}
      >
        <Add />
      </Fab>
    </Container>
  );
};
