import { Button, Container, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createStaffAction } from './user.action';
import { StaffRole } from './user.types';

export const UserCreatePage: FC<unknown> = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      role: StaffRole.MANAGER,
      email: '',
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
                <MenuItem value={StaffRole.MANAGER}>Мэнеджер</MenuItem>
                <MenuItem value={StaffRole.ADMIN}>Админинстратор</MenuItem>
              </Select>
            )}
          />
          <TextField label="Email" {...register('email', { required: true })} />
          <Button type="submit" variant="contained">
            Создать
          </Button>
        </Stack>
      </form>
    </Container>
  );
};
