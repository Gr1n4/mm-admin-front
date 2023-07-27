import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthPage, guard, ModPage, HomePage, UserPage } from '@/features';
import { Layout } from '../layout';

export const Root: FC<unknown> = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={guard(<HomePage />)} />
        <Route path="auth/*" element={<AuthPage />} />
        <Route path="user/*" element={guard(<UserPage />)} />
        <Route path="mod/*" element={guard(<ModPage />)} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Route>
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};
