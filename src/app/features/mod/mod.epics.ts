import { createAsyncSingleLoadingEpic } from '@ro-loading';
import { createAsyncEpic } from '@tsfsa-ro';
import { combineEpics } from 'redux-observable';
import { createModAction, feedModAction, getByIdModAction, updateModAction } from './mod.action';

const feedModEpic = createAsyncEpic(feedModAction, ({ modApi }) => modApi.feed.bind(modApi));
const createModEpic = createAsyncEpic(createModAction, ({ modApi }) => modApi.create.bind(modApi));
const updateModEpic = createAsyncEpic(updateModAction, ({ modApi }) => modApi.update.bind(modApi));
const getByIdModEpic = createAsyncEpic(getByIdModAction, ({ modApi }) => modApi.getById.bind(modApi));

const feedModLoadingEpic = createAsyncSingleLoadingEpic(feedModAction, 'feedMod');
const createModLoadingEpic = createAsyncSingleLoadingEpic(createModAction, 'createMod');
const getByIdModLoadingEpic = createAsyncSingleLoadingEpic(getByIdModAction, 'getByIdMod');

export const modEpic = combineEpics(
  feedModEpic,
  createModEpic,
  updateModEpic,
  getByIdModEpic,
  feedModLoadingEpic,
  createModLoadingEpic,
  getByIdModLoadingEpic,
);
