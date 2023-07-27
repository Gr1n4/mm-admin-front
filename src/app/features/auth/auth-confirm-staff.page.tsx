import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { confirmStaffAuthAction } from './auth.actions';

export const AuthConfirmStaffPage: FC = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const dispatch = useDispatch();
  const { authId } = useParams();

  const handleFormSubmit = ({ password, confirmPassword }: { password: string; confirmPassword: string }): void => {
    if (password === confirmPassword && authId) {
      dispatch(confirmStaffAuthAction.started({ password, authId }));
    }
  };
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <Container maxWidth="sm">
      <Typography sx={{ margin: '2rem 0' }} variant="h3" textAlign="center">
        Завершение регистрации
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={4}>
          <TextField label="Пароль" type="password" {...register('password', { required: true })} />
          <TextField label="Подтвердите пароль" type="password" {...register('confirmPassword', { required: true })} />
          <Button type="submit" variant="contained">
            Войти
          </Button>
        </Stack>
      </form>
    </Container>
  );
};
