import { Container, Typography } from '@mui/material';
import { getSingleLoadingSelector } from '@ro-loading';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ModForm } from './components';
import { getByIdModAction, updateModAction } from './mod.action';
import { getByIdModSelector } from './mod.selector';
import { ModCreatePayload } from './mod.types';

export const ModEditPage: FC = () => {
  const dispatch = useDispatch();
  const { modId } = useParams();
  const mod = useSelector(getByIdModSelector);
  const isLoading = useSelector((state) => getSingleLoadingSelector(state, 'getByIdMod'));

  useEffect(() => {
    if (modId) {
      dispatch(getByIdModAction.started(modId));
    }
  }, [modId]);

  const handleFormSubmit = (data: ModCreatePayload): void => {
    if (modId) {
      dispatch(updateModAction.started({ id: modId, data }));
    }
  };

  if (isLoading || !mod) {
    return 'Loading ...';
  }

  return (
    <Container sx={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <Typography sx={{ marginBottom: '2rem' }} variant="h1">
        Создание мода
      </Typography>
      <ModForm
        defaultValues={{
          type: mod.type,
          nameRu: mod.name.ru,
          nameEn: mod.name.en,
          descRu: mod.desc.ru,
          descEn: mod.desc.en,
          videoUrlRu: mod.videoUrl.ru,
          videoUrlEn: mod.videoUrl.en,
          version: mod.version,
          cost: mod.cost,
          priority: mod.priority.toString(),
          isNew: mod.isNew,
          isRevarded: mod.isRevarded,
          isRevardedEng: mod.isRevardedEng,
          picture: mod.picture.url,
          file: [],
          tags: mod.tags,
          generationKey: mod.generationKey,
        }}
        onSubmit={handleFormSubmit}
      />
    </Container>
  );
};
