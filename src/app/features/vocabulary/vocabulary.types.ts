import { BasicModel, UserEntity } from '@/types';

export enum VocabularyTypes {
  DIAGNOSE = 'DIAGNOSE',
  ALLERGY = 'ALLERGY',
  GRAFT = 'GRAFT',
}

export interface VocabularyEntity extends BasicModel {
  name: string;
  type: VocabularyTypes;
}

export interface DepartmentEntity extends BasicModel {
  name: string;
  doctors: UserEntity[];
}

export interface VocabularyCreatePayload {
  name: string;
  type: VocabularyTypes;
}

export interface DepartmentCreatePayload {
  name: string;
}

export interface VocabularyState {
  all: VocabularyEntity[];
  departments: DepartmentEntity[];
}
