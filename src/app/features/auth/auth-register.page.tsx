/* eslint-disable react/jsx-props-no-spreading */
import { UserSex } from '@/types';
import { Button, Container, Link, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerAuthAction } from './auth.actions';

export const AuthRegisterPage: FC<unknown> = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      surename: '',
      phoneNumber: '',
      sex: UserSex.MALE,
      birthDate: new Date(),
      country: '',
      city: '',
      street: '',
      house: '',
      appartment: '',
      passport: '',
      medicalInsurance: '',
    },
  });
  const dispatch = useDispatch();
  const handleFormSubmit = (body: any): void => {
    dispatch(registerAuthAction.started(body));
  };
  return (
    <Container maxWidth="sm">
      <Typography sx={{ margin: '2rem 0' }} variant="h3" textAlign="center">
        Регистрация
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={4}>
          <TextField label="Email" {...register('email', { required: true })} />
          <TextField label="Пароль" type="password" {...register('password', { required: true })} />
          <TextField label="Имя" {...register('firstName', { required: true })} />
          <TextField label="Фамилия" {...register('lastName', { required: true })} />
          <TextField label="Отчество" {...register('surename', { required: true })} />
          <TextField label="Телефон" {...register('phoneNumber', { required: true })} />
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <Select labelId="sex-label" id="sex" label="Пол" {...field}>
                <MenuItem value={UserSex.MALE}>Мужской</MenuItem>
                <MenuItem value={UserSex.FEMALE}>Женский</MenuItem>
              </Select>
            )}
          />
          <TextField label="Номер паспорта" {...register('passport', { required: true })} />
          <TextField label="Мед страховка" {...register('medicalInsurance', { required: true })} />
          <TextField label="Страна" {...register('country', { required: true })} />
          <TextField label="Город" {...register('city', { required: true })} />
          <TextField label="Улица" {...register('street', { required: true })} />
          <TextField label="Дом" {...register('house', { required: true })} />
          <TextField label="Квартира" {...register('appartment', { required: true })} />
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
