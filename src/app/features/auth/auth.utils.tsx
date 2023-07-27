import { ReactNode } from 'react';
import { PatientRoute } from './components';
import { UserEntity, UserRole } from '@/types';

interface Guard {
  redirect?: boolean;
  role?: UserRole;
}

const roleMap = {
  [UserRole.MANAGER]: 0,
  [UserRole.ADMIN]: 1,
  [UserRole.SUPER_ADMIN]: 2,
};

export const guard = (
  element: ReactNode,
  { redirect = true, role = UserRole.MANAGER }: Guard = { redirect: true, role: UserRole.MANAGER },
) => {
  return <PatientRoute element={element} redirect={redirect} role={role} />;
};

export function isAccept(userRole: UserRole, roleDestination: UserRole): boolean {
  return roleMap[userRole] >= roleMap[roleDestination];
}
