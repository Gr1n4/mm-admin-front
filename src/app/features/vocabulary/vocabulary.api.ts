import { CoreApi } from '@/api';
import { Observable } from 'rxjs';
import { DepartmentCreatePayload, DepartmentEntity, VocabularyCreatePayload, VocabularyEntity } from './vocabulary.types';

export class VocabularyApi extends CoreApi {
  search(): Observable<VocabularyEntity[]> {
    return this.get('/vocabulary');
  }

  getDepartments(): Observable<DepartmentEntity[]> {
    return this.get('/department');
  }

  createDepartment(body: DepartmentCreatePayload): Observable<DepartmentEntity> {
    return this.post('/department', body);
  }

  create(body: VocabularyCreatePayload): Observable<VocabularyEntity> {
    return this.post('/vocabulary', body);
  }
}
