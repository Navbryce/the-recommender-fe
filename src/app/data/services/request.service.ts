import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private httpClient: HttpClient) {}

  get<T>(
    url: string,
    body?: any,
    params?: HttpParams
  ): Observable<HttpResponse<T>> {
    return this.makeRequest(this.buildRequest('get', url, params, body));
  }

  post<T>(
    url: string,
    body: any,
    params?: HttpParams
  ): Observable<HttpResponse<T>> {
    return this.makeRequest(this.buildRequest('post', url, body, params));
  }

  private buildRequest<T>(
    method: string,
    url: string,
    body?: any,
    params?: HttpParams
  ): HttpRequest<T> {
    return new HttpRequest<T>(method, url, body, { params });
  }

  private makeRequest<T>(request: HttpRequest<T>): Observable<HttpResponse<T>> {
    return this.httpClient
      .request(request)
      .pipe(map((event) => event as HttpResponse<T>));
  }
}
