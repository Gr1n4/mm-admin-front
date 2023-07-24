import { from, Observable } from 'rxjs';

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include' as const,
};

async function success<T>(data: Response): Promise<T> {
  const response = await data.json();
  // if (response.success) {
  //   return response.data;
  // }
  // throw response.error;
  return response;
}

export class CoreApi {
  apiUrl = __API_URL__;

  get<R>(url: string): Observable<R> {
    return from(
      fetch(`${this.apiUrl}${url}`, {
        ...defaultOptions,
        method: 'GET',
      }).then<R>(success),
    );
  }

  delete<R>(url: string): Observable<R> {
    return from(
      fetch(`${this.apiUrl}${url}`, {
        ...defaultOptions,
        method: 'DELETE',
      }).then<R>(success),
    );
  }

  post<R, D>(url: string, data?: D): Observable<R> {
    return from(
      fetch(`${this.apiUrl}${url}`, {
        ...defaultOptions,
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      }).then<R>(success),
    );
  }

  postFiles<R>(url: string, data?: FormData): Observable<R> {
    return from(
      fetch(`${this.apiUrl}${url}`, {
        method: 'POST',
        credentials: 'include' as const,
        body: data,
      }).then<R>(success),
    );
  }

  putFiles<R>(url: string, data?: FormData): Observable<R> {
    return from(
      fetch(`${this.apiUrl}${url}`, {
        method: 'PUT',
        credentials: 'include' as const,
        body: data,
      }).then<R>(success),
    );
  }

  put<R, D>(url: string, data?: D): Observable<R> {
    return from(
      fetch(`${this.apiUrl}${url}`, {
        ...defaultOptions,
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      }).then<R>(success),
    );
  }
}
