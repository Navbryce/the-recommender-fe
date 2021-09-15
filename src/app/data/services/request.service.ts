import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export class ObservableEventSource {
  private existingObservables: Map<string, Observable<any>>;

  constructor(private serverSource: EventSource) {
    this.existingObservables = new Map<string, Observable<any>>();
  }

  getObservableForEvent<T>(event: string): Observable<T> {
    // not perfectly thread safe, not criticl
    if (this.existingObservables.has(event)) {
      return this.existingObservables.get(event);
    }
    const observable = new Observable<T>((subscriber) => {
      this.serverSource.addEventListener(event, (event) => {
        subscriber.next(JSON.parse((event as any).data));
      });
    });
    this.existingObservables[event] = observable;
    return observable;
  }
}

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private httpClient: HttpClient) {}

  get<T>(
    url: string,
    body?: any,
    params?: HttpParams,
    headers?: HttpHeaders,
    withCredentials?: boolean
  ): Observable<T> {
    return this.makeRequest(
      this.buildRequest('get', url, body, params, headers, withCredentials)
    );
  }

  post<T>(
    url: string,
    body: any,
    params?: HttpParams,
    headers?: HttpHeaders,
    withCredentials?: boolean
  ): Observable<T> {
    return this.makeRequest(
      this.buildRequest('post', url, body, params, headers, withCredentials)
    );
  }

  put<T>(
    url: string,
    body: any,
    params?: HttpParams,
    headers?: HttpHeaders,
    withCredentials?: boolean
  ): Observable<T> {
    return this.makeRequest(
      this.buildRequest('put', url, body, params, headers, withCredentials)
    );
  }

  private buildRequest<T>(
    method: string,
    url: string,
    body?: any,
    params?: HttpParams,
    headers?: HttpHeaders,
    withCredentials?: boolean
  ): HttpRequest<T> {
    return new HttpRequest<T>(method, url, body, {
      params,
      headers,
      withCredentials,
    });
  }

  private makeRequest<T>(request: HttpRequest<T>): Observable<T> {
    return this.httpClient.request(request).pipe(
      map((event) => event as HttpResponse<T> | HttpErrorResponse),
      filter((event) => event.type === HttpEventType.Response),
      map((event) => {
        if (event instanceof HttpErrorResponse) {
          throw event;
        }
        return event.body;
      })
    );
  }

  public getServerSentEvents<T>(
    url: string,
    withCredentials?: boolean
  ): ObservableEventSource {
    const eventSource = new EventSource(url, {
      withCredentials,
    });
    return new ObservableEventSource(eventSource);
  }
}
