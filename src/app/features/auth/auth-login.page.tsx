import { Button, Container, Link, Stack, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginAuthAction } from './auth.actions';

export const AuthLoginPage: FC<unknown> = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const dispatch = useDispatch();

  const handleFormSubmit = ({ email, password }: { email: string; password: string }): void => {
    dispatch(loginAuthAction.started({ email, password }));
  };
  return (
    <Container maxWidth="sm">
      <Typography sx={{ margin: '2rem 0' }} variant="h3" textAlign="center">
        Авторизация
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={4}>
          <TextField
            label="Email"
            placeholder="Введите вашу электронную почту"
            {...register('email', { required: true })}
          />
          <TextField
            label="Пароль"
            type="password"
            placeholder="Введите ваш пароль"
            {...register('password', { required: true })}
          />
          <Button type="submit" variant="contained">
            Войти
          </Button>
          <Link href="/auth/sign-up" variant="button" textAlign="center">
            Зарегистрироваться
          </Link>
        </Stack>
      </form>
    </Container>
  );
};
