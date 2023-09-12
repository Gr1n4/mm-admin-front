import { Box, CircularProgress, Container, Fab, Link, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { getSingleLoadingSelector } from '@ro-loading';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ModDndList } from './components';
import { sortedFeedModAction } from './mod.action';
import { ModType } from './mod.types';

interface ModListPageProps {
  type: ModType;
}

export const ModListPage: FC<ModListPageProps> = ({ type }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => getSingleLoadingSelector(state, 'feedSortedMod'));

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
        component={Link}
        href="/mod/create"
        target="_blank"
        rel="noopener noreferrer"
        size="large"
        color="primary"
      >
        <Add />
      </Fab>
    </Container>
  );
};
