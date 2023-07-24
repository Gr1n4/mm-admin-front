import actionCreatorFactory from 'typescript-fsa';
import { ProductEntity } from './home.types';

const actionCreator = actionCreatorFactory('[HOME]');

export const searchProductAction = actionCreator.async<void, ProductEntity[]>('SEARCH');
