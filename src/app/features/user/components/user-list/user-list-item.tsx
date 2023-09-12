import { UserEntity, UserRole } from '@/types';
import { IconButton, Menu, MenuItem, TableCell, TableRow } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { FC, MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAction } from '../../user.action';
import { getUserSelector } from '@/features/auth';

interface UserListItemProps {
  user: UserEntity;
}

export const UserListItem: FC<UserListItemProps> = ({ user }) => {
  const { email, id, role, isActive, authId } = user;
  const selfUser = useSelector(getUserSelector);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = () => {
    dispatch(deleteUserAction.started(id));
    setAnchorEl(null);
  };

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{role}</TableCell>
      <TableCell>{!isActive ? `${__DOMAIN__}/auth/confirm-staff/${authId}` : ''}</TableCell>
      <TableCell align="right">
        {selfUser?.role === UserRole.SUPER_ADMIN ? (
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: '20ch',
                },
              }}
            >
              <MenuItem onClick={handleRemove}>Удалить</MenuItem>
            </Menu>
          </div>
        ) : null}
      </TableCell>
    </TableRow>
  );
};
