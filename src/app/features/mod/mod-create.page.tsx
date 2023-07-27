import { Container, Typography } from '@mui/material';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { ModForm } from './components';
import { createModAction } from './mod.action';
import { ModCreatePayload, ModType } from './mod.types';

export const ModCreatePage: FC = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = (data: ModCreatePayload): void => {
    console.log('data: %o', data);
    dispatch(createModAction.started(data));
  };

  return (
    <Container sx={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <Typography sx={{ marginBottom: '2rem' }} variant="h1">
        Создание мода
      </Typography>
      <ModForm
        defaultValues={{
          type: ModType.MOD,
          nameRu: '',
          nameEn: '',
          descRu: '',
          descEn: '',
          videoUrlRu: '',
          videoUrlEn: '',
          version: '',
          cost: '',
          priority: '0',
          isNew: false,
          isRevarded: false,
          isRevardedEng: false,
          picture: null,
          file: [],
          tags: [],
          generationKey: '',
        }}
        onSubmit={handleFormSubmit}
      />
    </Container>
  );
};
