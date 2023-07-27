import { Epic } from '@/types';
import { createAsyncSingleLoadingEpic } from '@ro-loading';
import { createAsyncEpic, ofAction } from '@tsfsa-ro';
import { combineEpics } from 'redux-observable';
import { map } from 'rxjs';
import {
  createModAction,
  feedModAction,
  getByIdModAction,
  removeByIdModAction,
  sortedFeedModAction,
  updateModAction,
  updateSortedModAction,
} from './mod.action';
import { ModEntity } from './mod.types';

const feedModEpic = createAsyncEpic(feedModAction, ({ modApi }) => modApi.feed.bind(modApi));
const sortedFeedModEpic = createAsyncEpic(
  sortedFeedModAction,
  ({ modApi }) =>
    () =>
      modApi.sortedFeed().pipe(
        map((data) => {
          return {
            record: [...data.SKIN, ...data.MOD, ...data.SEED, ...data.MAP].reduce((acc, item) => {
              acc[item.id] = item;
              return acc;
            }, {} as Record<string, ModEntity>),
            sortedIds: {
              MOD: data.MOD.map(({ id }) => id),
              SKIN: data.SKIN.map(({ id }) => id),
              SEED: data.SEED.map(({ id }) => id),
              MAP: data.MAP.map(({ id }) => id),
            },
          };
        }),
      ),
);
const createModEpic = createAsyncEpic(createModAction, ({ modApi }) => modApi.create.bind(modApi));
const updateModEpic = createAsyncEpic(updateModAction, ({ modApi }) => modApi.update.bind(modApi));
const updateSortedModEpic = createAsyncEpic(updateSortedModAction, ({ modApi }) => modApi.updateSorted.bind(modApi));
const getByIdModEpic = createAsyncEpic(getByIdModAction, ({ modApi }) => modApi.getById.bind(modApi));
const removeByIdModEpic = createAsyncEpic(removeByIdModAction, ({ modApi }) => modApi.removeById.bind(modApi));

const realodFeedAfterRemove: Epic = (action$) =>
  action$.pipe(
    ofAction(removeByIdModAction.done),
    map(() => feedModAction.started()),
  );

const realodFeedAfterUpdate: Epic = (action$) =>
  action$.pipe(
    ofAction(updateSortedModAction.done),
    map(() => feedModAction.started()),
  );

const feedModLoadingEpic = createAsyncSingleLoadingEpic(feedModAction, 'feedMod');
const sortedFeedModLoadingEpic = createAsyncSingleLoadingEpic(sortedFeedModAction, 'feedSortedMod');
const createModLoadingEpic = createAsyncSingleLoadingEpic(createModAction, 'createMod');
const getByIdModLoadingEpic = createAsyncSingleLoadingEpic(getByIdModAction, 'getByIdMod');

export const modEpic = combineEpics(
  feedModEpic,
  sortedFeedModEpic,
  createModEpic,
  updateModEpic,
  updateSortedModEpic,
  getByIdModEpic,
  removeByIdModEpic,

  realodFeedAfterRemove,
  realodFeedAfterUpdate,

  feedModLoadingEpic,
  sortedFeedModLoadingEpic,
  createModLoadingEpic,
  getByIdModLoadingEpic,
);
