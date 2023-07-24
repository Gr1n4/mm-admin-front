import { Container, Link } from '@mui/material';
import { FC } from 'react';

export const AdminPage: FC = () => {
  return (
    <Container>
      <Link href="/vocabulary">Словари</Link>
      <Link href="/user/staff">Персонал</Link>
      <Link href="/user/create">Создать персонал</Link>
    </Container>
  );
};
