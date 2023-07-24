import { FC, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartmentsSelector, getVocabulariesSelector } from './vocabulary.selector';
import {
  createDepartmentAction,
  createVocabularyAction,
  getDepartmentsAction,
  searchVocabularyAction,
} from './vocabulary.action';
import { Controller, useForm } from 'react-hook-form';
import { VocabularyTypes } from './vocabulary.types';

export const VocabularyPage: FC = () => {
  const vocabularies = useSelector(getVocabulariesSelector);
  const departments = useSelector(getDepartmentsSelector);
  const [isCreateModal, setIsCreateModal] = useState(false);
  const dispatch = useDispatch();
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      type: VocabularyTypes.DIAGNOSE,
    },
  });
  useEffect(() => {
    dispatch(searchVocabularyAction.started());
    dispatch(getDepartmentsAction.started());
  }, []);

  const handleFormSubmit = (data) => {
    console.log('data: %o', data);
    if (data.type === 1) {
      dispatch(createDepartmentAction.started({ name: data.name }));
    } else {
      dispatch(createVocabularyAction.started(data));
    }
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h2">Словари</Typography>
        <Button variant="contained" onClick={() => setIsCreateModal(true)}>
          Создать
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <List>
            {vocabularies.map(({ id, name, type }) => (
              <ListItem key={id}>
                <ListItemText primary={name} secondary={type} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={6}>
          <List>
            {departments.map(({ id, name }) => (
              <ListItem key={id}>
                <ListItemText primary={name} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      <Dialog open={isCreateModal} onClose={() => setIsCreateModal(false)}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogTitle>Создать новую запись словаря</DialogTitle>
          <DialogContent>
            <Stack spacing={4}>
              <TextField label="Название" {...register('name', { required: true })} />
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select labelId="voc-label" id="voc" label="Тип" {...field}>
                    <MenuItem value={VocabularyTypes.DIAGNOSE}>Диагноз</MenuItem>
                    <MenuItem value={VocabularyTypes.ALLERGY}>Аллергия</MenuItem>
                    <MenuItem value={VocabularyTypes.GRAFT}>Прививка</MenuItem>
                    <MenuItem value={1}>Департамент</MenuItem>
                  </Select>
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              Создать
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};
