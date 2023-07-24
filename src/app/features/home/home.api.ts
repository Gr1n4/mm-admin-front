import { CoreApi } from '@/api';
import { Observable } from 'rxjs';
import { ProductEntity } from './home.types';

export class HomeApi extends CoreApi {
  search(): Observable<ProductEntity[]> {
    return this.get('/product/search');
  }
}
