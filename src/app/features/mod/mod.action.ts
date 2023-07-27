import actionCreatorFactory from 'typescript-fsa';
import { ModCreatePayload, ModEntity, ModUpdatePayload, SortedFeedDone, SortedUpdatePayload } from './mod.types';

const actionCreator = actionCreatorFactory('[MOD]');

export const createModAction = actionCreator.async<ModCreatePayload, ModEntity>('CREATE');
export const updateModAction = actionCreator.async<ModUpdatePayload, ModEntity>('UPDATE');
export const feedModAction = actionCreator.async<void, ModEntity[]>('FEED');
export const getByIdModAction = actionCreator.async<string, ModEntity>('GET_BY_ID');
export const removeByIdModAction = actionCreator.async<string, void>('REMOVE_BY_ID');
export const sortedFeedModAction = actionCreator.async<void, SortedFeedDone>('SORTED_FEED');
export const updateSortedModAction = actionCreator.async<SortedUpdatePayload, void>('UPDATE_SORTED');
