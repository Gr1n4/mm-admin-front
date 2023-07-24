import { BasicModel, UserEntity } from '@/types';

export interface TicketEntity extends BasicModel {
  startTime: Date;
  doctor: UserEntity;
  patient: UserEntity;
}

export interface TicketCreatePayload {
  startTime: Date;
  doctorId: string;
  patientId: string;
}

export interface TicketState {
  all: TicketEntity[];
}
