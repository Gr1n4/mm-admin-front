/* eslint-disable react/jsx-props-no-spreading */
import { Button, Container, Link, Stack, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerAuthAction } from './auth.actions';

export const AuthRegisterPage: FC<unknown> = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const dispatch = useDispatch();
  const handleFormSubmit = (body: any): void => {
    dispatch(registerAuthAction.started(body));
  };
  return (
    <Container maxWidth="sm">
      <Typography sx={{ margin: '2rem 0' }} variant="h3" textAlign="center">
        Регистрация супер админа
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={4}>
          <TextField label="Email" {...register('email', { required: true })} />
          <TextField label="Пароль" type="password" {...register('password', { required: true })} />
          <Button type="submit" variant="contained">
            Зарегистрироваться
          </Button>
          <Link href="/auth/login" variant="button" textAlign="center">
            Войти
          </Link>
        </Stack>
      </form>
    </Container>
  );
};
