import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private httpClient: HttpClient) {}

  get<T>(
    url: string,
    body?: any,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.makeRequest(
      this.buildRequest('get', url, body, params, headers)
    );
  }

  post<T>(
    url: string,
    body: any,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.makeRequest(
      this.buildRequest('post', url, body, params, headers)
    );
  }

  put<T>(
    url: string,
    body: any,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.makeRequest(
      this.buildRequest('put', url, body, params, headers)
    );
  }

  private buildRequest<T>(
    method: string,
    url: string,
    body?: any,
    params?: HttpParams,
    headers?: HttpHeaders
  ): HttpRequest<T> {
    return new HttpRequest<T>(method, url, body, { params, headers });
  }

  private makeRequest<T>(request: HttpRequest<T>): Observable<T> {
    return this.httpClient.request(request).pipe(
      map((event) => event as HttpResponse<T> | HttpErrorResponse),
      filter((event) => event.type !== 0),
      map((event) => {
        if (event instanceof HttpErrorResponse) {
          throw event;
        }
        return event.body;
      })
    );
  }
}
