import { DayOfWeek, ScheduleEntity } from '@/types/schedule';
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Stack, styled, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addScheduleAction } from '../../user.action';

interface ScheduleEditProps {
  schedules: ScheduleEntity[];
  dayOfWeek: DayOfWeek;
  doctorId: string;
}

const Root = styled(Box)(() => {
  return {
    width: `${100 / 5}%`,
  };
});

export const ScheduleEdit: FC<ScheduleEditProps> = ({ schedules, dayOfWeek, doctorId }) => {
  const [isCreateModal, setIsCreateModal] = useState(false);
  const dispatch = useDispatch();
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      start: '0:00',
      end: '0:00',
    },
  });
  const handleFormSubmit = (data: any) => {
    dispatch(addScheduleAction.started({ doctorId, dayOfWeek, ...data }));
  };

  return (
    <Root>
      <Card>
        <CardContent>
          <Typography variant="h4">{dayOfWeek}</Typography>
          {schedules
            .filter(({ dayOfWeek: _dayOfWeek }) => dayOfWeek === _dayOfWeek)
            .map(({ id, start, end }) => (
              <Typography key={id} variant="body1">
                Начало {start.toString()} - Конец {end.toString()}
              </Typography>
            ))}
          <Button onClick={() => setIsCreateModal(true)}>Создать</Button>
        </CardContent>
      </Card>
      <Dialog open={isCreateModal} onClose={() => setIsCreateModal(false)}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogTitle>Добавить новое расписание</DialogTitle>
          <DialogContent>
            <Stack spacing={4}>
              <TextField label="Начало" {...register('start', { required: true })} />
              <TextField label="Конец" {...register('end', { required: true })} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">
              Создать
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Root>
  );
};
