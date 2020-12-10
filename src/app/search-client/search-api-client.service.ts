import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestService } from '../data/services/request.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchApiClient {
  private static readonly DEFAULT_POST_HEADERS = {
    'Content-Type': 'application/json',
  };

  constructor(private requestService: RequestService) {}

  get<T>(apiPath: string, body?: any, httpParams?: HttpParams): Observable<T> {
    return this.requestService.get(
      this.generateRequestUrl(apiPath),
      body,
      httpParams
    );
  }

  post<T>(apiPath: string, body: any, params?: HttpParams): Observable<T> {
    return this.requestService.post(
      this.generateRequestUrl(apiPath),
      body,
      params,
      this.addDefaultsToHttpHeaders(SearchApiClient.DEFAULT_POST_HEADERS)
    );
  }

  private generateRequestUrl(apiPath: string): string {
    return environment.searchApiUrl + apiPath;
  }

  private addDefaultsToHttpHeaders(
    defaults: { [key: string]: string },
    httpHeaders?: HttpHeaders
  ): HttpHeaders {
    const result = httpHeaders == null ? new HttpHeaders() : httpHeaders;
    Object.entries(defaults).forEach(([key, value]) => {
      result.append(key, value);
    });
    return result;
  }
}
