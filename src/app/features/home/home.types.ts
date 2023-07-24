import { BasicModel } from '@/types';

export interface ProductEntity extends BasicModel {
  title: string;
  size: number;
  color: string;
  price: number;
}

export interface HomeState {
  all: ProductEntity[];
}
