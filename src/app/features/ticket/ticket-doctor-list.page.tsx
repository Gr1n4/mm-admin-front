import { Link, List, ListItem, ListItemText } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getTicketsSelector } from './ticket.selector';

export const TicketDoctorListPage: FC = () => {
  const tickets = [
    { id: 1, startTime: '01.05.2023 8:30', patient: { lastName: 'Иванов', firstName: 'Иван' } },
    { id: 2, startTime: '01.05.2023 10:30', patient: { lastName: 'Сергеев', firstName: 'Сергей' } },
    { id: 3, startTime: '01.05.2023 12:00', patient: { lastName: 'Сидорова', firstName: 'Екатерина' } },
  ];
  return (
    <List>
      {tickets.map((ticket) => (
        <ListItem key={ticket.id}>
          <ListItemText
            primary={`${ticket.patient.lastName} ${ticket.patient.firstName}`}
            secondary={ticket.startTime}
          />
          <Link href="/ticket/1">Прием</Link>
        </ListItem>
      ))}
    </List>
  );
};
