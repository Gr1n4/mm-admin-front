import { CoreApi } from '@/api';
import { Observable } from 'rxjs';
import { TicketCreatePayload, TicketEntity } from './ticket.types';

export class TicketApi extends CoreApi {
  create(body: TicketCreatePayload): Observable<TicketEntity> {
    return this.post('/ticket', body);
  }

  getByDoctor(): Observable<TicketEntity[]> {
    return this.get('/ticket');
  }
}
