import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthPage, guard, HomePage, TicketPage, UserPage, VocabularyPage } from '@/features';
import { Layout } from '../layout';
import { AdminPage } from '@/features/admin.page';
import { UserRole } from '@/types';
import { ModPage } from '@/features/mod/mod.page';

export const Root: FC<unknown> = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={guard(<HomePage />, { redirect: true })} />
        <Route path="ticket/*" element={guard(<TicketPage />)} />
        <Route path="auth/*" element={<AuthPage />} />
        <Route path="admin" element={guard(<AdminPage />, { role: UserRole.ADMIN })} />
        <Route path="vocabulary" element={guard(<VocabularyPage />, { role: UserRole.ADMIN })} />
        <Route path="user/*" element={guard(<UserPage />, { redirect: false })} />
        {/*<Route path="mod/*" element={guard(<ModPage />, { redirect: false })} />*/}
        <Route path="mod/*" element={<ModPage />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Route>
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};
