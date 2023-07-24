import actionCreatorFactory from 'typescript-fsa';
import { ModCreatePayload, ModEntity, ModUpdatePayload } from './mod.types';

const actionCreator = actionCreatorFactory('[MOD]');

export const createModAction = actionCreator.async<ModCreatePayload, ModEntity>('CREATE');
export const updateModAction = actionCreator.async<ModUpdatePayload, ModEntity>('UPDATE');
export const feedModAction = actionCreator.async<void, ModEntity[]>('FEED');
export const getByIdModAction = actionCreator.async<string, ModEntity>('GET_BY_ID');
