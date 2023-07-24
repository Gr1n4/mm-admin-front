import { CoreApi, toFormData } from '@/api';
import { Observable } from 'rxjs';
import { ModCreatePayload, ModEntity, ModUpdatePayload } from './mod.types';

export class ModApi extends CoreApi {
  getById(id: string): Observable<ModEntity> {
    return this.get(`/mod/${id}`);
  }

  create(body: ModCreatePayload): Observable<ModEntity> {
    return this.postFiles('/mod', toFormData(body, ['picture', 'file']));
  }

  update({ id, data }: ModUpdatePayload): Observable<ModEntity> {
    return this.putFiles(`/mod/${id}`, toFormData(data, ['picture', 'file']));
  }

  feed(): Observable<ModEntity[]> {
    return this.get('/mod');
  }
}
