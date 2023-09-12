import { Epic } from '@/types';
import { createAsyncSingleLoadingEpic } from '@ro-loading';
import { createAsyncEpic, ofAction } from '@tsfsa-ro';
import * as R from 'ramda';
import { combineEpics } from 'redux-observable';
import { filter, map } from 'rxjs';
import {
  createModAction,
  feedModAction,
  getByIdModAction,
  removeByIdModAction,
  sortedFeedModAction,
  updateModAction,
  updateSortedModAction,
} from './mod.action';

const propId = R.map(R.prop('id'));

const feedModEpic = createAsyncEpic(feedModAction, ({ modApi }) => modApi.feed.bind(modApi));
const sortedFeedModEpic = createAsyncEpic(
  sortedFeedModAction,
  ({ modApi }) =>
    () =>
      modApi.sortedFeed().pipe(
        map((data) => {
          return {
            record: R.indexBy(R.prop('id'), [...data.SKIN, ...data.MOD, ...data.SEED, ...data.MAP]),
            sortedIds: {
              MOD: propId(data.MOD),
              SKIN: propId(data.SKIN),
              SEED: propId(data.SEED),
              MAP: propId(data.MAP),
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

const reloadFeedAfterRemove: Epic = (action$) =>
  action$.pipe(
    ofAction(removeByIdModAction.done),
    map(() => sortedFeedModAction.started()),
  );

const reloadFeedAfterUpdate: Epic = (action$) =>
  action$.pipe(
    ofAction(updateSortedModAction.done),
    map(() => sortedFeedModAction.started()),
  );

const navigateToMoListAfterCreateEpic: Epic = (action$, _, { history }) =>
  action$.pipe(
    ofAction(createModAction.done),
    filter(({ result }) => {
      history.replace(`/mod/${result.type.toLowerCase()}`);
      return false;
    }),
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

  // reloadFeedAfterRemove,
  reloadFeedAfterUpdate,
  navigateToMoListAfterCreateEpic,

  feedModLoadingEpic,
  sortedFeedModLoadingEpic,
  createModLoadingEpic,
  getByIdModLoadingEpic,
);
