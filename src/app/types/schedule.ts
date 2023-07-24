import { BasicModel } from './common';

export interface ScheduleEntity extends BasicModel {
  start: string;
  end: string;
  dayOfWeek: DayOfWeek;
}

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export interface ScheduleCreatePayload {
  start: string;
  end: string;
  dayOfWeek: DayOfWeek;
  doctorId: string;
}
