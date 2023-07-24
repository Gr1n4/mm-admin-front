import { Box, CircularProgress, Container, Fab, Grid, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { getSingleLoadingSelector } from '@ro-loading';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ModCard } from './components';
import { feedModAction } from './mod.action';
import { getFeedModSelector } from './mod.selector';

export const ModListPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mods = useSelector(getFeedModSelector);
  const isLoading = useSelector((state) => getSingleLoadingSelector(state, 'feedMod'));

  useEffect(() => {
    dispatch(feedModAction.started());
  }, []);

  return (
    <Container sx={{ position: 'relative' }}>
      <Typography sx={{ marginBottom: '2rem' }} variant="h2">
        Список модов
      </Typography>
      {isLoading ? (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {mods.map((mod) => (
            <Grid key={mod.id} item xs={4}>
              <ModCard mod={mod} />
            </Grid>
          ))}
        </Grid>
      )}
      <Fab
        sx={{ position: 'fixed', bottom: '4rem', right: '4rem' }}
        size="large"
        color="primary"
        onClick={() => navigate('/mod/create')}
      >
        <Add />
      </Fab>
    </Container>
  );
};
