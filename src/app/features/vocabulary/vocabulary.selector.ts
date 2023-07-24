import { createSelector } from 'reselect';
import { VocabularyState } from './vocabulary.types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const vocabularySelector = <T extends { vocabulary: VocabularyState }>(state: T) => state.vocabulary;

export const getVocabulariesSelector = createSelector(vocabularySelector, ({ all }) => all);
export const getDepartmentsSelector = createSelector(vocabularySelector, ({ departments }) => departments);
