import { UserEntity } from '@/types';
import { Box, Button, Link, styled, TableCell, TableRow, Typography } from '@mui/material';
import { FC } from 'react';

interface UserListItemProps {
  user: UserEntity;
}

export const UserListItem: FC<UserListItemProps> = ({ user }) => {
  const { email, id, role, isActive, authId } = user;
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{role}</TableCell>
      <TableCell>{!isActive ? `${__DOMAIN__}/confirm-staff/${authId}` : ''}</TableCell>
      <TableCell align="right">Actions</TableCell>
    </TableRow>
  );
};
