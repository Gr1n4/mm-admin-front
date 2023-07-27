import { getUserSelector, isAccept } from '@/features/auth';
import { UserRole } from '@/types';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeByIdModAction } from '../../mod.action';
import { byIdModSelector } from '../../mod.selector';
import { ModEntity } from '../../mod.types';

interface CardProps {
  item: string;
  dnd: any;
}

export const ModCard: FC<CardProps> = ({ item, dnd }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  const mod = useSelector((state) => byIdModSelector(state, item));

  const handlerRemove = () => {
    dispatch(removeByIdModAction.started(mod.id));
  };

  return (
    <Card
      sx={{ display: 'flex' }}
      style={{ ...dnd.item.styles, ...dnd.handler.styles }}
      className={dnd.item.classes}
      ref={dnd.item.ref}
      {...dnd.handler.listeners}
    >
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
            <Button size="small" onClick={handlerRemove}>
              Удалить
            </Button>
          ) : null}
          <Button size="small" onClick={() => navigate(`/mod/edit/${mod.id}`)}>
            Редактировать
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};
