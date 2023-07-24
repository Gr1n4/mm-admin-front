import { UserRole } from '@/types';
import { Container, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserListItem } from './components';
import { searchUsersAction } from './user.action';
import { getUsersSelector } from './user.selector';

interface UserListPageProps {
  role: UserRole[];
  title: string;
}

export const UserListPage: FC<UserListPageProps> = ({ role, title }) => {
  const dispatch = useDispatch();
  const users = useSelector(getUsersSelector);

  useEffect(() => {
    dispatch(searchUsersAction.started({ role }));
  }, [role]);

  return (
    <Container>
      <Typography variant="h2">{title}</Typography>
      {users.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
    </Container>
  );
};
