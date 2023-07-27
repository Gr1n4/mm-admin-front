import { FC } from 'react';
import { Container } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { guard } from '../auth';
import { UserCreatePage } from './user-create.page';
import { UserRole } from '@/types';
import { UserListPage } from './user-list.page';

const staff = [UserRole.ADMIN, UserRole.MANAGER];

export const UserPage: FC = () => {
  return (
    <Container>
      <Routes>
        <Route
          index
          element={guard(<UserListPage role={staff} title="Персонал" />, {
            role: UserRole.ADMIN,
          })}
        />
        <Route path="/create" element={guard(<UserCreatePage />, { role: UserRole.ADMIN })} />
        <Route path="*" element={<Navigate to="/user" />} />
      </Routes>
    </Container>
  );
};
