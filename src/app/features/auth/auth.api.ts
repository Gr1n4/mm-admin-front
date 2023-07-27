import { CoreApi } from '@/api';
import { Observable } from 'rxjs';
import { ConfirmStaffPayload, LoginPayload, ProfileResponse, RegisterPayload } from './auth.types';

export class AuthApi extends CoreApi {
  login(body: LoginPayload): Observable<ProfileResponse> {
    return this.post('/auth/login', body);
  }

  register(body: RegisterPayload): Observable<ProfileResponse> {
    return this.post('/auth/register-super-admin', body);
  }

  confirmStaff(body: ConfirmStaffPayload): Observable<ProfileResponse> {
    return this.post('/auth/complete-register-staff', body);
  }

  profile(): Observable<ProfileResponse> {
    return this.get('/auth/profile');
  }

  logout(): Observable<boolean> {
    return this.put('/auth/logout');
  }
}
