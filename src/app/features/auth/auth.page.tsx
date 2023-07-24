import { FC, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';

import { AuthRegisterPage } from './auth-register.page';
import { isLogedinSelector } from './auth.selectors';
import { AuthLoginPage } from './auth-login.page';
import { AuthConfirmStaffPage } from './auth-confirm-staff.page';

export const AuthPage: FC<unknown> = () => {
  const navigate = useNavigate();
  const isLogedin = useSelector(isLogedinSelector);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isLogedin) {
      navigate('/');
    }
  }, [isLogedin]);

  return (
    <Container>
      <Routes>
        <Route path="/login" element={<AuthLoginPage />} />
        <Route path="/sign-up" element={<AuthRegisterPage />} />
        <Route path="/confirm-staff/:authId" element={<AuthConfirmStaffPage />} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </Container>
  );
};
