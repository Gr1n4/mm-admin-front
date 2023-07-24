import { FC } from 'react';
import { Container } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { guard } from '../auth';
import { UserRole } from '@/types';
import { TicketDoctorListPage } from './ticket-doctor-list.page';
import { VisitPage } from './visit.page';

export const TicketPage: FC = () => {
  return (
    <Container>
      <Routes>
        <Route path="/list" element={guard(<TicketDoctorListPage />, { role: UserRole.DOCTOR })} />
        <Route path="/:ticketId" element={guard(<VisitPage />, { role: UserRole.DOCTOR })} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
};
