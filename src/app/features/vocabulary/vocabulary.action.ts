import actionCreatorFactory from 'typescript-fsa';
import {
  DepartmentCreatePayload,
  DepartmentEntity,
  VocabularyCreatePayload,
  VocabularyEntity,
} from './vocabulary.types';

const actionCreator = actionCreatorFactory('[VOCABULARY]');

export const searchVocabularyAction = actionCreator.async<void, VocabularyEntity[]>('SEARCH');
export const getDepartmentsAction = actionCreator.async<void, DepartmentEntity[]>('DEPARTMENTS');
export const createVocabularyAction = actionCreator.async<VocabularyCreatePayload, VocabularyEntity>('CREATE');
export const createDepartmentAction = actionCreator.async<DepartmentCreatePayload, DepartmentEntity>(
  'CREATE_DEPARTMENT',
);
