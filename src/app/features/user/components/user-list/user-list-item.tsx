import { UserEntity } from '@/types';
import { Box, Button, Link, styled, Typography } from '@mui/material';
import { FC } from 'react';

interface UserListItemProps {
  user: UserEntity;
}

const Root = styled(Box)(() => {
  return {};
});

export const UserListItem: FC<UserListItemProps> = ({ user }) => {
  const { firstName, lastName, surename, id } = user;
  return (
    <Root>
      <Typography variant="h6">
        {lastName} {firstName} {surename}
      </Typography>
      <Link href={`/user/doctor/edit/${id}`}>Редактировать</Link>
    </Root>
  );
};
