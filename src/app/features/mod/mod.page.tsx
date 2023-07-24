import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { guard } from '../auth';
import { ModCreatePage } from './mod-create.page';
import { ModEditPage } from './mod-edit.page';
import { ModListPage } from './mod-list.page';

export const ModPage: FC = () => {
  return (
    <Routes>
      <Route index element={guard(<ModListPage />, { redirect: true })} />
      <Route path="create" element={guard(<ModCreatePage />, { redirect: false })} />
      <Route path="edit/:modId" element={guard(<ModEditPage />, { redirect: false })} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};
