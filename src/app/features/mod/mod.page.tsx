import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { guard } from '../auth';
import { ModCreatePage } from './mod-create.page';
import { ModEditPage } from './mod-edit.page';
import { ModListPage } from './mod-list.page';
import { ModType } from './mod.types';

export const ModPage: FC = () => {
  return (
    <Routes>
      <Route path="mod" element={guard(<ModListPage type={ModType.MOD} />)} />
      <Route path="map" element={guard(<ModListPage type={ModType.MAP} />)} />
      <Route path="seed" element={guard(<ModListPage type={ModType.SEED} />)} />
      <Route path="skin" element={guard(<ModListPage type={ModType.SKIN} />)} />
      <Route path="create" element={guard(<ModCreatePage />, { redirect: false })} />
      <Route path="edit/:modId" element={guard(<ModEditPage />, { redirect: false })} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};
