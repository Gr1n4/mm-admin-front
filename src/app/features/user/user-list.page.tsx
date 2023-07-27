import { UserRole } from '@/types';
import { Add } from '@mui/icons-material';
import {
  Container,
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserListItem } from './components';
import { searchUsersAction } from './user.action';
import { getUsersSelector } from './user.selector';

interface UserListPageProps {
  role: UserRole[];
  title: string;
}

export const UserListPage: FC<UserListPageProps> = ({ role, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(getUsersSelector);

  useEffect(() => {
    dispatch(searchUsersAction.started({ role }));
  }, [role]);

  return (
    <Container>
      <Typography variant="h2">{title}</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Почта</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Ссылка для регистрации</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <UserListItem key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab
        sx={{ position: 'fixed', bottom: '4rem', right: '4rem' }}
        size="large"
        color="primary"
        onClick={() => navigate('/user/create')}
      >
        <Add />
      </Fab>
    </Container>
  );
};
