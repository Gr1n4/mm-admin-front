import { getUserSelector, isAccept } from '@/features/auth';
import { UserRole } from '@/types';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Link, Typography } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { byIdModSelector } from '../../mod.selector';

interface CardProps {
  modId: string;
  onRemove: (id: string) => void;
}

export const ModCard: FC<CardProps> = ({ modId, onRemove }) => {
  const navigate = useNavigate();
  const user = useSelector(getUserSelector);
  const mod = useSelector((state) => byIdModSelector(state, modId));

  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia sx={{ width: '19rem' }} component="img" image={mod.picture.url} alt={mod.picture.originalName} />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="h5" component="div">
            {mod.name.ru}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {mod.name.en}
          </Typography>
          <Typography variant="body2">{mod.desc.ru}</Typography>
        </CardContent>
        <CardActions>
          {user && isAccept(user.role, UserRole.ADMIN) ? (
            <Button size="small" onClick={() => onRemove(modId)}>
              Удалить
            </Button>
          ) : null}
          <Button component={Link} href={`/mod/edit/${mod.id}`} target="_blank" rel="noopener noreferrer">Редактировать</Button>
        </CardActions>
      </Box>
    </Card>
  );
};
