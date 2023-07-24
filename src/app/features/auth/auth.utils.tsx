import { ReactNode } from 'react';
import { PatientRoute } from './components';
import { UserRole } from '@/types';

interface Guard {
  redirect?: boolean;
  role?: UserRole;
}

export const guard = (
  element: ReactNode,
  { redirect = false, role = UserRole.PATIENT }: Guard = { redirect: false, role: UserRole.PATIENT },
) => {
  return <PatientRoute element={element} redirect={redirect} role={role} />;
};
