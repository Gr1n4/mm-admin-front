import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModEntity } from '../../mod.types';

interface CardProps {
  mod: ModEntity;
}

export const ModCard: FC<CardProps> = ({ mod }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardMedia component="img" height="194" image={mod.picture.url} alt={mod.picture.originalName} />
      <CardContent>
        <Typography variant="h5" component="div">
          {mod.name.ru}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {mod.name.en}
        </Typography>
        <Typography variant="body2">{mod.desc.ru}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/mod/edit/${mod.id}`)}>Редактировать</Button>
      </CardActions>
    </Card>
  );
};
