import { UserSex } from '@/types';
import { Button, Container, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createStaffAction } from './user.action';
import { StaffRole } from './user.types';

export const UserCreatePage: FC<unknown> = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      role: StaffRole.DOCTOR,
      email: '',
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
    dispatch(createStaffAction.started(body));
  };
  return (
    <Container maxWidth="sm">
      <Typography sx={{ margin: '2rem 0' }} variant="h3" textAlign="center">
        Создание персонала
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={4}>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select labelId="role-label" id="role" label="Роль" {...field}>
                <MenuItem value={StaffRole.DOCTOR}>Доктор</MenuItem>
                <MenuItem value={StaffRole.ADMIN}>Админинстратор</MenuItem>
              </Select>
            )}
          />
          <TextField label="Email" {...register('email', { required: true })} />
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
            Создать
          </Button>
        </Stack>
      </form>
    </Container>
  );
};
