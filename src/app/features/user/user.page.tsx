import { FC } from 'react';
import { Container } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { guard } from '../auth';
import { UserCreatePage } from './user-create.page';
import { UserRole } from '@/types';
import { UserListPage } from './user-list.page';
import { DoctorEditPage } from './doctor-edit.page';

const staff = [UserRole.ADMIN, UserRole.DOCTOR];
const doctorRole = [UserRole.DOCTOR];

export const UserPage: FC = () => {
  return (
    <Container>
      <Routes>
        <Route path="/create" element={guard(<UserCreatePage />, { role: UserRole.ADMIN, redirect: true })} />
        <Route
          path="/staff"
          element={guard(<UserListPage role={staff} title="Персонал" />, {
            role: UserRole.ADMIN,
            redirect: true,
          })}
        />
        <Route path="/doctors" element={<UserListPage role={doctorRole} title="Доктора" />} />
        <Route path="/doctor/edit/:doctorId" element={guard(<DoctorEditPage />, { role: UserRole.ADMIN })} />
        <Route path="/patient/:doctorId" element={null} />
        <Route path="/:userId" element={null} />
        <Route path="*" element={<Navigate to="/user/doctors" />} />
      </Routes>
    </Container>
  );
};
