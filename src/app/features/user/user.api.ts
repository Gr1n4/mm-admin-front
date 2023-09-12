import { CoreApi } from '@/api';
import { UserEntity } from '@/types';
import { Observable } from 'rxjs';
import qs from 'query-string';
import { StaffCreatePayload, StaffUpdatePayload, UserSearchPayload } from './user.types';

export class UserApi extends CoreApi {
  search(params: UserSearchPayload): Observable<UserEntity[]> {
    return this.get(`/user?${qs.stringify(params)}`);
  }

  getById(userId: string): Observable<UserEntity> {
    return this.get(`/user/${userId}`);
  }

  updateById(userId: string, body: StaffUpdatePayload): Observable<UserEntity> {
    return this.put(`/user/${userId}`, body);
  }

  register(body: StaffCreatePayload): Observable<UserEntity> {
    return this.post('/auth/register-staff', body);
  }

  removeById(id: string): Observable<void> {
    return this.delete(`/user/${id}`);
  }
}
