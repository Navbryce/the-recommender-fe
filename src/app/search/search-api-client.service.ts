import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestService } from '../data/services/request.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchApiClient {
  constructor(private requestService: RequestService) {}

  get<T>(
    apiPath: string,
    body?: any,
    httpParams?: HttpParams
  ): Observable<HttpResponse<T>> {
    return this.requestService.get(
      this.generateRequestUrl(apiPath),
      body,
      httpParams
    );
  }

  post<T>(
    apiPath: string,
    body: any,
    params?: HttpParams
  ): Observable<HttpResponse<T>> {
    return this.requestService.post(
      this.generateRequestUrl(apiPath),
      body,
      params
    );
  }

  private generateRequestUrl(apiPath: string): string {
    return environment.searchApiUrl + apiPath;
  }
}
