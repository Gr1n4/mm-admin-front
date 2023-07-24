import { Box, Button, Container, MenuItem, Select, Stack, Typography } from '@mui/material';
import { dayOfWeek } from 'src/constants';
import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDepartmentsAction, getDepartmentsSelector } from '../vocabulary';
import { ScheduleEdit } from './components';
import { getDoctorByIdAction, updateDoctorByIdAction } from './user.action';
import { getDoctorSelector } from './user.selector';

export const DoctorEditPage: FC = () => {
  const { doctorId } = useParams();
  const dispatch = useDispatch();
  const departments = useSelector(getDepartmentsSelector);
  const doctor = useSelector(getDoctorSelector);
  const { register, control, setValue, handleSubmit } = useForm({
    defaultValues: {
      departamentIds: doctor?.departments.map(({ id }) => id) ?? [],
    },
  });

  useEffect(() => {
    dispatch(getDepartmentsAction.started());
    if (doctorId) {
      dispatch(getDoctorByIdAction.started(doctorId));
    }
  }, [doctorId]);

  useEffect(() => {
    setValue('departamentIds', doctor?.departments.map(({ id }) => id) ?? []);
  }, [doctor?.departments, setValue]);

  const handleFormSubmit = (data) => {
    console.log('submit data: %o', data);
    dispatch(updateDoctorByIdAction.started(data));
  };

  return (
    <Container>
      <Typography sx={{ margin: '2rem 0' }} variant="h3" textAlign="center">
        Редактирование врача
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={4} maxWidth="sm">
          <Controller
            name="departamentIds"
            control={control}
            render={({ field }) => (
              <Select labelId="department-label" id="department" multiple label="Специализация" {...field}>
                {departments.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <Button type="submit" variant="contained">
            Сохранить
          </Button>
        </Stack>
      </form>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        {dayOfWeek.map((item) => (
          <ScheduleEdit dayOfWeek={item} schedules={doctor?.schedules ?? []} doctorId={doctorId!} />
        ))}
      </Box>
    </Container>
  );
};
